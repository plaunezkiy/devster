from rest_framework.viewsets import ReadOnlyModelViewSet
from django.shortcuts import render
from blog.models import Post
from core.models import App
from core.serializers import AppSerializer


class AppViewSet(ReadOnlyModelViewSet):
    queryset = App.objects.all()
    serializer_class = AppSerializer


def index(request):
    # post = Post.objects.get(pk=2)
    return render(request, 'core/index.html', context={})


def cv_index(request):
    return render(request, 'core/cv.html')


def apps_index(request):
    return render(request, 'core/apps.html')