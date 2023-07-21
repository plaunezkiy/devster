from django.db import models


class App(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    thumbnail = models.ImageField(upload_to="apps/")
    url = models.URLField(blank=True)

    def __str__(self):
        return self.name
