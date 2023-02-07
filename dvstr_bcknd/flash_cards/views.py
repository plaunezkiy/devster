from django.shortcuts import get_object_or_404, render, redirect
from rest_framework import viewsets, response, status
from rest_framework.decorators import action
from flash_cards.models import Card, Module, Session
from flash_cards.forms import CardForm
from flash_cards.serializers import CardSerializer, ModuleSerializer, SessionSerializer

# API views

class CardsViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class ModulesViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    lookup_field = 'slug'

    @action(detail=True)
    def cards(self, request, slug, *args, **kwargs):
        """get cards for a specific module"""
        module = get_object_or_404(self.queryset, slug=slug)
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
