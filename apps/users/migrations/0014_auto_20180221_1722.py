# Generated by Django 2.0.2 on 2018-02-21 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_auto_20180221_1721'),
    ]

    operations = [
        migrations.AlterField(
            model_name='holouser',
            name='first_name',
            field=models.CharField(blank=True, default='', max_length=30),
        ),
    ]
