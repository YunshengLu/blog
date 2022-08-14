from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from blog.models import Article, Userinfo
from rest_framework.authtoken.models import Token

# 文章分页 数据列表
@api_view(['GET'])
def articleList(request):
    page = request.GET['page']
    pageSize = request.GET['pageSize']
    # lanmu = request.GET['lanmu']

    # if lanmu == 'all':
    #     articles = Article.objects.all()
    # elif lanmu == 'nobelong':
    #     articles = Article.objects.filter(belong_lanmu=None)
    # else:
    #     articles = Article.objects.filter(belong_lanmu__name=lanmu)
    token = request.headers.get('authorization')
    user_token = Token.objects.filter(key=token)
    if user_token:
        articles = Article.objects.all()
        total = len(articles)
        paginator = Paginator(articles, pageSize)
        try:
            articles = paginator.page(page)
        except PageNotAnInteger:
            articles = paginator.page(1)
        except EmptyPage:
            articles = paginator.page(paginator.num_pages)

        # print(articles)
        articles_data = []
        for a in articles:
            a_item = {
                'title': a.title,
                'cover': a.cover,
                'nickName': '',
                'id': a.id
            }
            article_user = a.belong
            userinfo = Userinfo.objects.filter(belong=article_user)
            if userinfo[0].nickName:
                a_item['nickName'] = userinfo[0].nickName
            else:
                a_item['nickName'] = article_user.username
            # print(a_item['nickName'])
            articles_data.append(a_item)

        return Response({'data': articles_data, 'total': total})
    else: 
        return Response({
            'status': 401,
            'code': 0,
            'data':'tokenTimeout'
            })
