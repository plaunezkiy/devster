# Generated by Django 3.2.16 on 2023-02-04 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(default=True, null=True, upload_to='blog/images/'),
        ),
    ]