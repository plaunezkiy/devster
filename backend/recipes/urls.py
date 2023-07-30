from rest_framework.routers import DefaultRouter
from recipes.views import ScheduleViewSet, RecipeViewSet

app_name = "recipes"

router = DefaultRouter()

# router.register("meals", MealViewSet, "meals")
router.register("schedules", ScheduleViewSet, "schedules")
router.register("recipes", RecipeViewSet, "recipes")

urlpatterns = [
    
] + router.urls
