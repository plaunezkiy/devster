# Generated by Django 3.2.16 on 2023-02-17 18:28

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flash_cards', '0008_session_modules'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='queue',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, default=[], size=None),
        ),
    ]