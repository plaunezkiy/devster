from django.urls import path
from core import views


urlpatterns = [
    path('', views.index, name='home'),
    path('cv/', views.cv_index, name='cv-index'),
    path('apps/', views.apps_index, name='apps-index')
]
