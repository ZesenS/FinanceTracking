# Generated by Django 4.2.7 on 2023-12-19 14:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0003_userexpenses_date_alter_userexpenses_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userexpenses',
            name='date',
            field=models.DateField(default=datetime.date(2023, 12, 19)),
        ),
    ]