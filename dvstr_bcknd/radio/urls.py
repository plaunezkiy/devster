from django.urls import path
from radio import views

urlpatterns = [
    path('', views.index, name='radio-index'),
    path('demo', views.index, name='radio-demo'),
    path('callback', views.callback, name='radio-token-callback'),
    path('refresh/<str:refresh_token>/', views.refresh_token, name='radio-token-refresh'),
    path('<path:path>', views.index, name='radio-fallback'),
]
