from rest_framework.routers import DefaultRouter

app_name = 'core'

from core import views

router = DefaultRouter()
router.register('app', views.AppViewSet, basename='apps')


urlpatterns = [
    # path('modules'),
]

urlpatterns += router.urls
