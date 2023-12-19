from django.db import models
from django.db.models import Sum
from datetime import datetime, timedelta


# Create your models here.


class UserLogin(models.Model):
    name = models.CharField(max_length=32)
    password = models.CharField(max_length=64)


class Expenses(models.Model):
    objects = None
    name = models.CharField(max_length=32)
    area = models.CharField(max_length=32)
    amount = models.FloatField()
    type = models.CharField(max_length=32)
    info = models.CharField(max_length=128)
    date = models.DateField()

    @classmethod
    def getAreaExpenses(cls):
        """
        查询给定用户名的花费记录
        """
        final = {}
        today = datetime.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=6)

        # 查询本周内每个区域的花费总和
        result_this_week = Expenses.objects.filter(date__range=[start_of_week, end_of_week]).values('area').annotate(
            amount=Sum('amount'))
        result_today = Expenses.objects.filter(date=today).values('area').annotate(amount=Sum('amount'))

        for i in range(len(result_today)):
            final[result_today[i]['area']] = [result_today[i]['amount'], result_this_week[i]['amount'],
                                              result_this_week[i]['amount']]
        return final

    @classmethod
    def getTypeExpenses(cls):
        final = []
        result = Expenses.objects.values('type').annotate(amount=Sum('amount'))
        for entry in result:
            final.append(entry['amount'])
        return final
