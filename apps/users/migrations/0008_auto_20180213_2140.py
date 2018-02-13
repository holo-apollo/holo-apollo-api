# Generated by Django 2.0.2 on 2018-02-13 21:40

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_subscription_edit_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='edit_token',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
