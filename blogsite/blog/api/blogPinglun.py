from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from blog.api.userLoginAndPerm import userLoginAndPerm
from blog.models import Article, Pinglun

# 评论
@api_view(['GET', 'POST'])
def blogPinglun(request):
  if request.method == "GET":
    article_id = request.GET['article_id']
    pagesize = request.GET['pagesize']
    page = request.GET['page']
    article = Article.objects.get(id=article_id)

    pingluns = Pinglun.objects.filter(belong=article)[::-1]

    total = len(pingluns)
    paginator = Paginator(pingluns, pagesize)
    try:
        pingluns = paginator.page(page)
    except PageNotAnInteger:
        pingluns = paginator.page(1)
    except EmptyPage:
        pingluns = paginator.page(paginator.num_pages)

    pinglun_data = []
    for pinglun in pingluns:
      pinglun_item = {
        "nickName": pinglun.belong_user.username,
        "text": pinglun.text
      }
      pinglun_data.append(pinglun_item)
    return Response({"data": pinglun_data, "total": total})

  if request.method == "POST":
    token = request.headers['authorization']
    permList = [
          'blog.view_article'
      ]
    checkUser = userLoginAndPerm(token, permList)
    print(checkUser)
    if checkUser != 'perm_pass':
        return Response(checkUser)
    article_id = request.POST['article_id']
    text = request.POST['text']

    article = Article.objects.get(id=article_id)
    user = Token.objects.get(key=token).user

    new_pinglun = Pinglun(belong_user=user, belong=article, text=text)
    new_pinglun.save()
    return Response('ok')
