from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField
from taggit.managers import TaggableManager


class Module(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField()
    image = models.ImageField(
        upload_to='flash_cards/images/',
        null=True,
        default=None
    )

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField()


class Card(models.Model):
    front = models.CharField(max_length=120)
    back = models.CharField(max_length=120)
    hint = models.CharField(max_length=120, blank=True)
    invertible = models.BooleanField(default=False)
    tags = TaggableManager(blank=True)
    module = models.ForeignKey(
        to=Module,
        on_delete=models.CASCADE,
        related_name='flash_cards'
    )

    def __str__(self):
        return f"{self.front}-{self.back}-{'v' if self.invertible else 'x'}"


class Session(models.Model):
    start_time = models.DateTimeField(editable=False)
    end_time = models.DateTimeField(null=True)
    modules = models.ManyToManyField(Module, related_name="sessions", blank=True)
    queue = ArrayField(models.IntegerField(), blank=True, default=list())
    cards = models.ManyToManyField(Card, through='SessionCardAnswer', related_name='sessions')

    def save(self, *args, **kwargs):
        ''' timestamp upon creation'''
        # DateTime fields with auto_now attribute inherit `editable=False`
        # and will therefore not be displayed in admin panel
        # to fix, manually timestamp the field on creation (no id assigned yet)
        if not self.id:
            self.start_time = timezone.now()
        return super(Session, self).save(*args, **kwargs)


class SessionCardAnswer(models.Model):
    card = models.ForeignKey(
        to=Card,
        null=True,
        related_name='answers',
        on_delete=models.SET_NULL,
        )
    session = models.ForeignKey(
        to=Session,
        null=True,
        related_name='answers',
        on_delete=models.SET_NULL,
    )
    correct = models.BooleanField(default=False)
