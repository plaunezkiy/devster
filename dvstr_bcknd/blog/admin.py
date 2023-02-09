from django.contrib import admin
from blog.models import Post
from blog.forms import PostAdminForm


class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm


admin.site.register(Post, PostAdmin)
