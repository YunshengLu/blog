from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from blog.models import Article
import json

# 删除文章
@api_view(['DELETE'])
def deleteArticle(request):
    print(request,'=========================')

    # data = json.loads(request.body)
    # article_id = data['id']
    article_id = request.GET['id']
    print(article_id,'=========================')

    token = request.headers['authorization']

    user_token = Token.objects.filter(key=token)
    if len(user_token) == 0:
        return Response({
            'status': 401, 
            'code': -1,
            'data':'nologin'
            })

    user = user_token[0].user
    user_perm = user.has_perm("blog.delete_article")
    print("文章删除权限")
    print(user_perm)
    if user_perm == False:
        return Response({
            'code': 0,
            'data':'noperm'
            })
    print(article_id)
    article = Article.objects.get(id=article_id)
    article.delete()
    return Response({
        'code': 1,
        'data': 'ok'
        })

