from django.urls import path
from blog import views


urlpatterns = [
    path('', views.blog_index, name='blog-index'),
    path('<slug:post_slug>/', views.post_index, name='post-index')
]
