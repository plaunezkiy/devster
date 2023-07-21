from django.db import models
from django.contrib.auth.models import User
from tinymce import models as tinymce_models


class Post(models.Model):
    # image = models.ImageField(
    #     upload_to="blog/images/",
    #     null=True,
    #     default=True,
    # author = models.ForeignKey(
    #     User, on_delete=models.CASCADE, related_name='posts')
    series = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150)
    text = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to="blog-images/", blank=True, null=True)
    published = models.BooleanField(default=False)
    # date_created = models.DateTimeField(auto_now_add=True)
    # date_updates = models.DateTimeField()
    # view_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.series} - {self.title}"
