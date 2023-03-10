# Generated by Django 3.2.16 on 2022-12-25 16:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FlashCardModule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('slug', models.SlugField()),
                ('image', models.ImageField(default=None, null=True, upload_to='flash_cards/images/')),
            ],
        ),
        migrations.CreateModel(
            name='FlashCardSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField(editable=False)),
                ('end_time', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='FlashCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('front', models.CharField(max_length=120)),
                ('back', models.CharField(max_length=120)),
                ('invertible', models.BooleanField(default=False)),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='flash_cards', to='flash_cards.flashcardmodule')),
            ],
        ),
        migrations.CreateModel(
            name='FlashCardSessionAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('correct', models.BooleanField(default=False)),
                ('card', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='answers', to='flash_cards.flashcard')),
                ('session', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='answers', to='flash_cards.flashcardsession')),
            ],
            options={
                'unique_together': {('card', 'session')},
            },
        ),
    ]
