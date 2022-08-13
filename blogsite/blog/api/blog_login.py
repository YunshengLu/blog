from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password, make_password
from blog.models import Userinfo
from django.contrib.auth.models import User
import json

# 登录
@api_view(['POST'])
def blog_login(request):
    # data = json.loads(request.body)
    data = json.loads(request.body.decode())
    # print('-----',data.get('username'),'----------------')
    # concat = request.POST
    # print(data,'@@@@',concat,'@@@@@@@@@@@@@@@')
    if request.method == 'POST':
        username = data.get('username')
        password = data.get('password')
        # 登录逻辑
        user = User.objects.filter(username=username)
        if user:
            checkPwd = check_password(password, user[0].password)
            if checkPwd:
                userinfo = Userinfo.objects.get_or_create(belong=user[0])
                userinfo = Userinfo.objects.get(belong=user[0])
                token = Token.objects.get_or_create(user=user[0])
                token = Token.objects.get(user=user[0])
            else:
                return Response({
                    'code': 0,
                    'data':'pwderr'
                    })
        else:
            return Response({
                'code': -1,
                'data': 'none'
                })
    else:
        return Response('err')
    userinfo_data = {
        'code': 1,
        'token': token.key,
        'nickName': userinfo.nickName,
        'headImg': userinfo.headImg
    }
    return Response(userinfo_data)
