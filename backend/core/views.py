from rest_framework.viewsets import ReadOnlyModelViewSet
from django.shortcuts import render
# from blog.models import Post
from core.models import App
from core.serializers import AppSerializer


class AppViewSet(ReadOnlyModelViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer
