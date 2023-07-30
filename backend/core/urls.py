from rest_framework.routers import DefaultRouter
from core import views

router = DefaultRouter()
router.register('apps', views.AppViewSet, basename='apps')


urlpatterns = [
    # path('modules'),
]

urlpatterns += router.urls
