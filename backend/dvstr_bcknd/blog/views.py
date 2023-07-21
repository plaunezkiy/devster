from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from blog.serializers import PostSerializer
from blog.models import Post
from slugify import slugify


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def create(self, request, *args, **kwargs):
        # copy and manually add the slug
        data = request.data.copy()
        data["slug"] = slugify(data["title"])
        # boilerplate
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


def blog_index(request):
    posts = Post.objects.all()
    return render(request, 'blog/index.html', context={"posts": posts})


def post_index(request, post_slug):
    post = Post.objects.get(slug=post_slug)
    return render(request, 'blog/post_page.html', context={"post": post})