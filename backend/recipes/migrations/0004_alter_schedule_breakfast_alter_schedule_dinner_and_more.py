# Generated by Django 4.2.3 on 2023-07-30 17:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0003_schedule_delete_meal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='breakfast',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='breakfast', to='recipes.recipe'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='dinner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dinner', to='recipes.recipe'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='lunch',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lunch', to='recipes.recipe'),
        ),
    ]
