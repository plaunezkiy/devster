from django.urls import path
from flash_cards.views import CardsViewSet, ModulesViewSet, SessionViewSet
from rest_framework.routers import DefaultRouter

app_name = 'flash_cards'

router = DefaultRouter()
router.register('card', CardsViewSet, basename='cards')
router.register('module', ModulesViewSet, basename='modules')
router.register('session', SessionViewSet, basename='sessions')

urlpatterns = [
    # path('modules'),
]

urlpatterns += router.urls
