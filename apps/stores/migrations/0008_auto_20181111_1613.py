# Generated by Django 2.1.3 on 2018-11-11 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0007_auto_20181111_1231'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storeapplication',
            name='category',
            field=models.CharField(choices=[('', 'Category'), ('clothes', 'Clothes'), ('jewelry', 'Jewelry'), ('accessories', 'Accessories'), ('home_decor', 'Home decor'), ('shoes', 'Shoes')], max_length=30, verbose_name='Category'),
        ),
    ]