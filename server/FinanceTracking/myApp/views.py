from django.http import HttpResponse, JsonResponse
from django.views import View
from myApp.models import UserLogin, Expenses
import json
from datetime import datetime


class TimeChart(View):
    def get(self, request):
        param_value = request.GET.get('time')
        if param_value == "week":
            data = {
                "x": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "y": [45, 46, 47, 23, 56, 90, 33]
            }

        else:
            data = {
                "x": [2011, 2012, 2013, 2014, 2015, 2016],
                "y": [45, 46, 47, 23, 56, 33]
            }
        return JsonResponse(data)


class PieChart(View):
    def get(self, request):
        # 顺序： const categories = ["美食", "交通", "娱乐", "网购", "护理", "其他"]
        percentage = Expenses.getTypeExpenses()
        percentage = [round(e / sum(percentage), 3) * 100 for e in percentage]
        data = {"percentage": percentage}
        return JsonResponse(data)


class Map(View):
    def get(self, request):
        return JsonResponse(Expenses.getAreaExpenses())


class Upload(View):
    def post(self, request):
        today_date = datetime.now().date()
        # 格式化日期为 "YYYY-MM-DD" 形式
        formatted_date = today_date.strftime("%Y-%m-%d")
        # 将格式化后的日期字符串转换为 date 对象
        formatted_date_as_date = datetime.strptime(formatted_date, "%Y-%m-%d").date()
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        new_expenses = Expenses(name=data["name"], area=data["area"], amount=float(data["amount"]),
                                info=data["additional_info"], type=data["category"], date=formatted_date_as_date)
        new_expenses.save()
        # 在这里处理获取到的数据
        print(data)
        return HttpResponse("OK", status=200)
