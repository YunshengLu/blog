from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password, make_password
from blog.models import Userinfo
from django.contrib.auth.models import User
import json


# 注册
@api_view(['POST'])
def blog_register(request):
    # print(request.body,'####################')
    data = json.loads(request.body.decode())
    username = data.get('username')
    password = data.get('password')
    # password2 = request.POST['password2']
    # 注册逻辑
    user = User.objects.filter(username=username)
    if user:
        return Response({
            'code': 0,
            'data':'repeat'
            })
    else:
        new_password = make_password(password, username)
        newUser = User(username=username, password=new_password)
        newUser.save()

    token = Token.objects.get_or_create(user=newUser)
    token = Token.objects.get(user=newUser)
    userinfo = Userinfo.objects.get_or_create(belong=newUser)
    userinfo = Userinfo.objects.get(belong=newUser)
    userinfo_data = {
        'code': 1,
        'token': token.key,
        'nickName': userinfo.nickName,
        'headImg': userinfo.headImg
    }
    return Response(userinfo_data)
