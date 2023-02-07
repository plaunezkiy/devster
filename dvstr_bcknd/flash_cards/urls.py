from django.urls import path
from flash_cards import views


urlpatterns = [
    path('', views.modules_index),
    path('<slug:slug>', views.module_index, name='module-index'),
    path('<slug:slug>/new/', views.new_card, name='new-card'),
    path('<slug:slug>/<int:id>/', views.card_index, name='card-index'),
]
