# Generated by Django 2.1.7 on 2019-02-21 14:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0004_auto_20190221_1554'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storeapplicationimage',
            name='image',
        ),
    ]
