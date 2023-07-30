from rest_framework.serializers import ModelSerializer, CharField, Serializer
from recipes.models import Ingredient, Schedule, Recipe, IngredientLine


# class MealSerializer(ModelSerializer):
#     class Meta:
#         model = Meal
#         fields = "__all__"


class IngredientLineSerializer(ModelSerializer):
    title = CharField(source='ingredient.title')

    class Meta:
        model = IngredientLine
        fields = ('title', 'unit', 'quantity')


class RecipeSerializer(ModelSerializer):
    ingredients = IngredientLineSerializer(source='ingredient_lines', many=True)

    def create(self, validated_data):
        raw_ingredients = validated_data.pop("ingredient_lines")
        recipe = Recipe.objects.create(**validated_data)
        for ingredient in raw_ingredients:
            title = ingredient.get("ingredient", {}).get("title", None)
            quantity = ingredient.get("quantity", None)
            # if the ingredient doesn't exist, create it!
            (actual_ingredient, _) = Ingredient.objects.get_or_create(title=title)
            IngredientLine.objects.create(
                ingredient=actual_ingredient,
                recipe=recipe,
                quantity=quantity
            )
        return recipe

    def update(self, instance, validated_data):
        raw_ingredients = validated_data.pop("ingredient_lines")
        # update the actual recipe
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # to remove the ingredients not provided (assume deleted)
        ingredients = []
        for ingredient in raw_ingredients:
            title = ingredient.get("ingredient", {}).get("title", None)
            ingredients.append(title)
            quantity = ingredient.get("quantity", None)
            (actual_ingredient, _) = Ingredient.objects.get_or_create(title=title)
            try:
                ing_line = IngredientLine.objects.get(ingredient=actual_ingredient, recipe=instance)
                ing_line.quantity = quantity
                ing_line.save()
            except IngredientLine.DoesNotExist:
                IngredientLine.objects.create(
                    ingredient=actual_ingredient,
                    recipe=instance,
                    quantity=quantity
                )
        for ingredient_line in instance.ingredient_lines.all():
            if ingredient_line.ingredient.title not in ingredients:
                ingredient_line.delete()
        return instance

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'steps', 'ingredients')


class IngredientSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class ScheduleSerializer(ModelSerializer):
    breakfast = RecipeSerializer()
    lunch = RecipeSerializer()
    dinner = RecipeSerializer()

    def create(self, validated_data):
        return super().create(validated_data)
    
    class Meta:
        model = Schedule
        fields = '__all__'
