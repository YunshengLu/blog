from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from blog.models import Article, Favourite

@api_view(['POST'])
def articleFavor(request):
    print('收藏')
    token = request.headers['authorization']

    user_token = Token.objects.filter(key=token)
    if len(user_token) == 0:
        return Response({
            'status': 401, 
            'code': -1,
            'data':'nologin'
            })

    article_id = request.POST['article_id']
    article = Article.objects.get(id=article_id)

    favored = Favourite.objects.filter(belong=article,belong_user=user_token[0].user)

    if favored:
        favored[0].delete()
        return Response({
            'code': 1,
            'data': 'ok'
            })
    else:
        new_favor = Favourite(belong=article,belong_user=user_token[0].user)
        new_favor.save()
        return Response({
            'code': 1,
            'data': 'ok'
            })