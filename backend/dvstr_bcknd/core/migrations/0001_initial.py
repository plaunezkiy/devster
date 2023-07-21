# Generated by Django 3.2.16 on 2023-07-18 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='App',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=300)),
                ('thumbnail', models.ImageField(upload_to='apps/')),
                ('url', models.URLField(blank=True)),
            ],
        ),
    ]
