from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

# 登出
@api_view(['POST'])
def blog_logout(request):
    token = request.headers['authorization']
    user_token = Token.objects.get(key=token)
    user_token.delete()
    return Response('logout')
