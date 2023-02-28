from django.shortcuts import render
from blog.models import Post
from slugify import slugify


def blog_index(request):
    posts = Post.objects.all()
    return render(request, 'blog/index.html', context={"posts": posts})


def post_index(request, post_slug):
    post = Post.objects.get(slug=post_slug)
    return render(request, 'blog/post_page.html', context={"post": post})