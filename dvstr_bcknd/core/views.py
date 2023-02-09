from django.shortcuts import render
from blog.models import Post


def index(request):
    post = Post.objects.get(pk=2)
    return render(request, 'core/index.html', context={"post": post})