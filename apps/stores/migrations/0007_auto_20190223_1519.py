# Generated by Django 2.1.7 on 2019-02-23 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0006_auto_20190221_1611'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='description',
            field=models.TextField(default=' '),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='store',
            name='location',
            field=models.CharField(default=' ', max_length=50),
            preserve_default=False,
        ),
    ]