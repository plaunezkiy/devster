import datetime
import json
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404, render
from recipes.models import Schedule, Recipe, Ingredient
from recipes.serializers import ScheduleSerializer, RecipeSerializer, IngredientSerializer


# class MealViewSet(ModelViewSet):
#     queryset = Meal.objects.all()
#     serializer_class = MealSerializer
#     permission_classes = [permissions.IsAuthenticated]


class ScheduleViewSet(ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'date'

    @action(detail=False, methods=['GET'])
    def today(self, request):
        try:
            today = datetime.datetime.now().date()
            meals = request.user.schedule.filter(date=today).first()
            print(meals)
            serializer = ScheduleSerializer(meals)
            return Response(serializer.data)
        except Exception as e:
            print(e)

    def list(self, request, *args, **kwargs):
        # yyyy-mm-dd
        start = request.GET.get('start', None)
        end = request.GET.get('end', None)
        meals = request.user.schedule.filter(date__range=[start, end])
        return super().list(request, *args, **kwargs)

    def update(self, request, date, *args, **kwargs):
        print("begin")
        (schedule, _) = Schedule.objects.get_or_create(date=date, user=request.user)
        payload = json.loads(request.body)
        for meal in ['breakfast', 'lunch', 'dinner']:
            recipe_id = payload.get(meal, None)
            if recipe_id:
                recipe = get_object_or_404(Recipe, pk=recipe_id)
                print(schedule, meal, recipe)
                setattr(schedule, meal, recipe)
        serializer = self.get_serializer(schedule)
        schedule.save()
        if getattr(schedule, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            schedule._prefetched_objects_cache = {}

        return Response(serializer.data)


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    # permission_classes = [permissions.IsAuthenticated]


class IngredientViewSet(ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [permissions.IsAuthenticated]
