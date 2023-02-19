from django.shortcuts import render
from blog.models import Post


def index(request):
    # post = Post.objects.get(pk=2)
    return render(request, 'core/index.html', context={})


def cv_index(request):
    return render(request, 'core/cv.html')


def apps_index(request):
    return render(request, 'core/apps.html')