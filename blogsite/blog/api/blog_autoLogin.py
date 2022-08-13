from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from blog.models import Userinfo

# 自动登录
@api_view(['POST'])
def blog_autoLogin(request):
    token = request.headers.get('authorization')
    user_token = Token.objects.filter(key=token)
    if user_token:
        userinfo = Userinfo.objects.get(belong=user_token[0].user)
        userinfo_data = {
            'code': 1,
            'data': {
                'token': token,
                'nickName': userinfo.nickName,
                'headImg': userinfo.headImg
            }
        }
        return Response(userinfo_data)
    else:
        return Response({
            'status': 401,
            'code': 0,
            'data':'tokenTimeout'
            })