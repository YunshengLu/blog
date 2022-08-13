from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from blog.models import Article, Favourite, Like, PayOrder


@api_view(['POST'])
def userArticleInfo(request):
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
  user = user_token[0].user

  user_article_info = {
    "like": False,
    "favor": False,
    "dashang": False
  }

  liked = Like.objects.filter(belong=article, belong_user=user)
  if liked:
    user_article_info['like'] = True

  favored = Favourite.objects.filter(belong=article, belong_user=user)
  if favored:
    user_article_info['favor'] = True

  order_list = PayOrder.objects.filter(belong=article, belong_user=user)
  for order in order_list:
    if order.status == True:
      user_article_info["dashang"] = True

  return Response(user_article_info)

