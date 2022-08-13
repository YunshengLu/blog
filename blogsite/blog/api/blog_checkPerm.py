from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
import json

# 鉴权
@api_view(['POST'])
def blog_checkPerm(request):
    # print(json.loads(request.body),'########')
    data = json.loads(request.body)
    # print(data.get('permissions'),'########')
    token = request.headers['authorization']
    content_type = data.get('contentType')
    permissions = data.get('permissions')

    # print(token,'$$$$$$$$$$$$$$$$$$')
    # print(content_type)
    # print(permissions[0])
    user_token = Token.objects.filter(key=token)
    if user_token:
        user = user_token[0].user
        for p in permissions:
            app_str = content_type.split('_')[0]
            model_str = content_type.split('_')[1]
            perm_str = app_str + '.' + p + '_'+model_str
            print(perm_str)
            check = user.has_perm(perm_str)
            print(check)
            if check == False:
                return Response({
                    'code': 0,
                    'data':'noperm'
                    })
    else:
        return Response({
            'status': 401, 
            'code': -1,
            'data':'nologin'
            })

    return Response({
        'code': 1,
        'data': 'ok'
        })

