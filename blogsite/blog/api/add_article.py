from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from blog.api.userLoginAndPerm import userLoginAndPerm
from blog.models import Article, Lanmu
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
import os
import base64
import requests
import datetime
import json

hostUrl = 'http://127.0.0.1:8000/'

# 文章发布
@api_view(['POST', 'PUT'])
def add_article(request):
    token = request.headers['authorization']
    if request.method == "PUT":
        permList = [
            'blog.change_article'
        ]
        checkUser = userLoginAndPerm(token, permList)
        print(checkUser)
        if checkUser != 'perm_pass':
            return Response(checkUser)

        lanmu_id = request.POST['lanmu_id']
        article_id = request.POST['article_id']

        lanmu = Lanmu.objects.get(id=lanmu_id)
        article = Article.objects.get(id=article_id)
        article.belong_lanmu = lanmu
        article.save()
        return Response({
            'code': 1,
            'data': 'ok'
            })


    title = request.POST['title']
    describe = request.POST['describe']
    cover = request.POST['cover']
    content = request.POST['content']

    user_token = Token.objects.filter(key=token)
    if len(user_token) == 0:
        return Response({
            'status': 401, 
            'code': -1,
            'data':'nologin'
            })
    if len(title) == 0:
        return Response({
            'code': 0,
            'data':'notitle'
            })

    # 保存文章
    new_article = Article(title=title)
    new_article.save()
    # 解析富文本html文档
    soup = BeautifulSoup(content, 'html.parser')
    # 获取所有img标签 图片
    imgList = soup.find_all('img')
    # print(imgList)
    for img in range(0, len(imgList)):
        src = imgList[img]['src']
        # 判断图片 是远程 还是 本地
        if 'http://' in src or 'https://' in src:
            # print('远程图片')
            # 请求远程图片
            image = requests.get(src)
            # 转化二进制
            image_data = Image.open(BytesIO(image.content))
            print(image_data)
            # 设定文件名称
            image_name = datetime.datetime.now().strftime('%Y%m%d%H%M%S') + '-' + \
                str(new_article.id) + '-' + str(img)
            image_data.save("upload/" + image_name + ".png")
            new_src = hostUrl + "upload/" + image_name + ".png"
            content = content.replace(src, new_src)
            # 封面设定
            if cover == src:
                cover = new_src
        else:
            # print('本地图片')
            image_data = base64.b64decode(src.split(',')[1])
            image_name = datetime.datetime.now().strftime('%Y%m%d%H%M%S')+'-'+str(new_article.id) + \
                '-' + str(img) + '.' + \
                src.split(',')[0].split('/')[1].split(';')[0]
            # print(image_name)
            image_url = os.path.join('upload', image_name).replace('\\', '/')
            with open(image_url, 'wb') as f:
                f.write(image_data)
            # print(image_url)
            new_src = hostUrl + image_url
            content = content.replace(src, new_src)
            # 封面设定
            if cover == src:
                cover = new_src

    new_article.content = content
    new_article.describe = describe
    new_article.cover = cover
    new_article.belong = user_token[0].user
    new_article.save()
    return Response({
        'code': 1,
        'data': 'ok'
        })
