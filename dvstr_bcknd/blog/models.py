from django.db import models
from django.contrib.auth.models import User
from tinymce import models as tinymce_models


class Post(models.Model):
    # content = models.TextField()
    # image = models.ImageField(
    #     upload_to="blog/images/",
    #     null=True,
    #     default=True,
    # )
    # post_date = models.DateTimeField(auto_now_add=True)
    # view_count = models.IntegerField(default=0)
    # author = models.ForeignKey(
    #     User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=100)
    text = tinymce_models.HTMLField(blank=True)
