from django.urls import path
from blog.api.add_article import add_article
from blog.api.articleData import articleData
from blog.api.articleFavor import articleFavor
from blog.api.articleLike import articleLike
from blog.api.articleList import articleList
from blog.api.blogPinglun import blogPinglun
from blog.api.blog_autoLogin import blog_autoLogin
from blog.api.blog_checkPerm import blog_checkPerm
from blog.api.blog_group import blog_group
from blog.api.blog_lanmu import blog_lanmu
from blog.api.blog_login import blog_login
from blog.api.blog_logout import blog_logout
from blog.api.blog_register import blog_register
from blog.api.blog_userlist import blog_userlist
from blog.api.deleteArticle import deleteArticle
from blog.api.userArticleInfo import userArticleInfo
# from blog import payapi

urlpatterns = [
    #文章管理
        #文章数据获取 查看
        path('article-data/',articleData),
        #文章发布
        path('add-article/',add_article),
        #文章列表
        path('article-list/',articleList),
        #文章删除
        path('delete-article/',deleteArticle),
    #用户管理
        #登录
        path('blog-login/',blog_login),
        #注册
        path('blog-register/',blog_register),
        #自动登录
        path('auto-login/',blog_autoLogin),
        #登出
        path('blog-logout/',blog_logout),
        #鉴权
        path('blog-checkperm/',blog_checkPerm),
        #用户列表
        path('blog-userlist/',blog_userlist),
    #用户组
        path('blog-group/',blog_group),
    #栏目管理
        path('blog-lanmu/',blog_lanmu),
    #文章用户互动
        path('pinglun/',blogPinglun),
        path('user-article-info/',userArticleInfo),
        path('article-like/',articleLike),
        path('article-favor/',articleFavor),
        # path('get-alipay-url/',payapi.getAlipayUrl),
        # path('pay_result/',payapi.payResult)
]