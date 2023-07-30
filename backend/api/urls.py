from django.urls import include, path

urlpatterns = [
    path('', include('recipes.urls')),
    path('', include('core.urls')),
    # path('', include('')),
]
