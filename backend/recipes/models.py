from django.conf import settings
from django.db import models


class Feedback(models.Model):
    difficulty = models.IntegerField(default=0)
    taste = models.IntegerField(default=0)


class Ingredient(models.Model):
    title = models.CharField(max_length=150)


class IngredientLine(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE, related_name='ingredient_lines')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='ingredient_lines')
    # replace @unit by a proper model
    unit = models.CharField(max_length=50, default="g.")
    quantity = models.FloatField()

    class Meta:
        unique_together = ["recipe", "ingredient"]


class Recipe(models.Model):
    title = models.CharField(max_length=150)
    steps = models.TextField()
    ingredients = models.ManyToManyField(Ingredient, through=IngredientLine)

    def __str__(self):
        return self.title

# 


class RecipeInList(models.Model):
    recipe_list = models.ForeignKey('RecipeList', on_delete=models.CASCADE, related_name='recipe_list_item')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_list_item')
    position = models.SmallIntegerField(default=0)

    class Meta:
        unique_together = ['recipe', 'recipe_list']


class RecipeList(models.Model):
    title = models.CharField(max_length=150)
    recipes = models.ManyToManyField(Recipe, through=RecipeInList)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='recipe_lists')


class Schedule(models.Model):
    date = models.DateField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='schedule')
    breakfast = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, blank=True, related_name='breakfast')
    lunch = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, blank=True, related_name='lunch')
    dinner = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, blank=True, related_name='dinner')

    class Meta:
        unique_together = ["date", "user"]


# class Meal(models.Model):
#     class MealTypes(models.TextChoices):
#         BREAKFAST = "breakfast", "Breakfast"
#         LUNCH = "lunch", "Lunch"
#         DINNER = "dinner", "Dinner"
    
#     date = models.DateField()
#     type = models.CharField(max_length=20, choices=MealTypes.choices)
#     recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="meals")
#     owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='meals')
#     # feedback = models.ForeignKey(Feedback)

#     class Meta:
#         unique_together = ['date', 'type', 'owner']
    

# class Schedule(models.Model):
