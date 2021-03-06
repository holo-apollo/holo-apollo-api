# Generated by Django 2.1.7 on 2019-02-21 13:54

from django.db import migrations


def set_image_url(apps, schema_editor):
    StoreApplicationImage = apps.get_model('stores', 'StoreApplicationImage')
    for row in StoreApplicationImage.objects.all():
        row.image_url = row.image.url
        row.save()


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0003_storeapplicationimage_image_url'),
    ]

    operations = [
        migrations.RunPython(set_image_url, reverse_code=migrations.RunPython.noop)
    ]
