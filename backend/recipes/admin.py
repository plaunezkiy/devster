from django.contrib import admin
from recipes.models import Recipe, Schedule, Ingredient, IngredientLine

admin.site.register(Recipe)
admin.site.register(Schedule)
admin.site.register(Ingredient)
admin.site.register(IngredientLine)

