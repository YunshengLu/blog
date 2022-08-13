from rest_framework.response import Response
from rest_framework.decorators import api_view
from blog.models import Article


# 文章内容获取
@api_view(['GET'])
def articleData(request):
    article_id = request.GET['article_id']

    article = Article.objects.get(id=article_id)

    article_data = {
        "title": article.title,
        "cover": article.cover,
        "describe": article.describe,
        "content": article.content,
        "nickName": article.belong.username,
        "lanmu": "",
        "pre_id": 0,
        "next_id": 0,
    }

    pre_data = Article.objects.filter(id__lt=article_id)
    if pre_data:
        article_data["pre_id"] = pre_data.last().id
    next_data = Article.objects.filter(id__gt=article_id)
    if next_data:
        article_data["next_id"] = next_data.first().id

    if article.belong_lanmu:
        article_data["lanmu"] = article.belong_lanmu.name
    return Response(article_data)