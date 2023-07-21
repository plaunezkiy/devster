from django.urls import path
from blog.views import PostViewSet
from rest_framework.routers import DefaultRouter

app_name = 'blog'

router = DefaultRouter()
router.register('post', PostViewSet, basename='posts')

urlpatterns = [
    # path('modules'),
]

urlpatterns += router.urls
