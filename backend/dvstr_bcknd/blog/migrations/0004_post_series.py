# Generated by Django 3.2.16 on 2023-02-24 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20230208_1301'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='series',
            field=models.CharField(default='_', max_length=100),
            preserve_default=False,
        ),
    ]
