# Generated by Django 3.2.16 on 2022-12-25 17:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('flash_cards', '0003_auto_20221225_1724'),
    ]

    operations = [
        migrations.RenameField(
            model_name='session',
            old_name='answers',
            new_name='cards',
        ),
        migrations.AlterField(
            model_name='sessionanswer',
            name='card',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='answers', to='flash_cards.flashcard'),
        ),
        migrations.AlterField(
            model_name='sessionanswer',
            name='session',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='answers', to='flash_cards.session'),
        ),
    ]
