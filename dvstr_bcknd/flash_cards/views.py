from random import shuffle
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render, redirect
from rest_framework import viewsets, response, status
from rest_framework.decorators import action
from flash_cards.models import Card, Module, Session, SessionCardAnswer
from flash_cards.forms import CardForm, ModuleForm
from flash_cards.serializers import CardSerializer, ModuleSerializer, SessionSerializer

# API views

class CardsViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class ModulesViewSet(viewsets.ModelViewSet):
    serializer_class = ModuleSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Module.objects.all()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset

    @action(detail=True)
    def cards(self, request, slug):
        """get cards for a specific module"""
        module = get_object_or_404(self.get_queryset(), slug=slug)
        serializer = CardSerializer(data=module.flash_cards, many=True)
        serializer.is_valid()
        flash_cards = serializer.data
        return response.Response(
            data={
                "id": module.pk,
                "name": module.name,
                "slug": module.slug,
                "flash_cards": flash_cards
            },
            status=status.HTTP_200_OK)


class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    @action(detail=True)
    def generate_queue(self, request, pk):
        session = get_object_or_404(Session, pk=pk)
        # return 403 if the queue has already been created
        if session.queue:
            return response.Response(data={"message": "The queue has already been created."}, status=status.HTTP_403_FORBIDDEN)
        cards = Card.objects.all()
        # filter by slugs, otherwise all of the cards
        slugs = self.request.query_params.get('slug')
        if slugs:
            cards = cards.filter(module__slug__in=slugs.split(','))
        cards = cards.values('id')
        # get cards as an array of ids
        id_queue = list(map(lambda c: c.get('id'), cards))
        # shuffle and save
        shuffle(id_queue)
        session.queue = id_queue
        session.save()
        return response.Response(status=status.HTTP_201_CREATED)
    
    @action(detail=True)
    def get_card(self, request, pk):
        session = get_object_or_404(Session, pk=pk)
        # pop the first id in the queue
        card_id = session.queue.pop(0)
        card = Card.objects.get(pk=card_id)
        # serialize
        serializer = CardSerializer(instance=card)
        # save and send back
        session.save()
        return response.Response(serializer.data)
    
    @action(detail=True, methods=['POST'])
    def answer(self, request, pk):
        session = get_object_or_404(Session, pk=pk)
        print(request.POST)
        card_id = request.POST.get('id')
        print(card_id)
        correct = True if request.POST.get('correct') == 'true' else False
        card = get_object_or_404(Card, pk=card_id)
        SessionCardAnswer.objects.create(card=card, session=session, correct=correct)
        return response.Response(status=status.HTTP_202_ACCEPTED)




# Django Views
def modules_index(request):
    modules = Module.objects.all()
    return render(request, 'flash_cards/modules_index.html', 
        context={
            'modules': modules,
        }
    )


def module_index(request, slug):
    module = Module.objects.get(slug=slug)
    cards = module.flash_cards.all()
    return render(request, 'flash_cards/module_index.html', 
        context={
            'module': module,
            'cards': cards
        }
    )


def round(request):
    return render(request, 'flash_cards/round.html')


@login_required(login_url='/admin/')
def new_module(request):
    form = ModuleForm(request.POST or None, request.FILES or None)
    if request.method == "POST":
        if form.is_valid():
            form.save()
            return redirect("index")
    return render(request, "flash_cards/forms/module_form.html", context={"form": form})


@login_required(login_url='/admin/')
def card_index(request, slug, id):
    module = get_object_or_404(Module, slug=slug)
    card = get_object_or_404(Card, module=module, pk=id)
    tags = list(card.tags.names())
    
    form = CardForm(request.POST or None, instance=card)
    if request.method == "POST":
        if form.is_valid():
            form.edit()
            form.save()
            return redirect("module-index", module.slug)
    return render(request, "flash_cards/forms/card_form.html", context={
        "form": form,
        "card": card,
        "tags": tags,
    })


@login_required(login_url='/admin/')
def new_card(request, slug):
    module = get_object_or_404(Module, slug=slug)
    form = CardForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            card = form.save(commit=False)
            card.module = module
            card.save()
            tags = form.cleaned_data.get("tags")
            if tags:
                card.tags.set(tags, clear=True)
            return redirect("module-index", module.slug)
    return render(request, "flash_cards/forms/card_form.html", context={"module": module, "tags": []})
