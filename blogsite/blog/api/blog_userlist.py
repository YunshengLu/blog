from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

# 用户列表
@api_view(['GET'])
def blog_userlist(request):
    user_list = User.objects.all()
    user_list_data = []
    for user in user_list:
        user_item = {
            "name": user.username
        }
        user_list_data.append(user_item)
    return Response(user_list_data)
