from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User, Group, Permission, ContentType
from blog.api.userLoginAndPerm import userLoginAndPerm
import json

# 用户组管理
@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def blog_group(request):
    # 获取用户组列表
    if request.method == "GET":
        groups = Group.objects.all()
        groups_data = []
        for g in groups:
            g_item = {
                "name": g.name
            }
            groups_data.append(g_item)
        return Response(groups_data)
    # 用户 分配 用户组
    if request.method == "POST":
        token = request.headers['authorization']
        permList = [
            'auth.add_user',
            'auth.delete_user',
            'auth.change_user',
            'auth.view_user'
        ]
        checkUser = userLoginAndPerm(token, permList)
        print(checkUser)
        if checkUser != 'perm_pass':
            return Response(checkUser)

        gourp_name = request.POST['group']
        userlist_name = json.loads(request.POST['userlist'])

        group = Group.objects.get(name=gourp_name)

        for username in userlist_name:
            user = User.objects.get(username=username)
            # user.groups.add(group)
            group.user_set.add(user)
        return Response('ok')

    # 删除用户组
    if request.method == "DELETE":
        token = request.headers['authorization']
        permList = [
            'auth.add_user',
            'auth.delete_user',
            'auth.change_user',
            'auth.view_user'
        ]
        checkUser = userLoginAndPerm(token, permList)
        print(checkUser)
        if checkUser != 'perm_pass':
            return Response(checkUser)
        name = request.POST['name']

        gourp = Group.objects.get(name=name)
        gourp.delete()
        return Response('ok')

    # 新建用户组
    if request.method == "PUT":
        token = request.headers['authorization']
        permList = [
            'auth.add_user',
            'auth.delete_user',
            'auth.change_user',
            'auth.view_user'
        ]
        checkUser = userLoginAndPerm(token, permList)
        print(checkUser)
        if checkUser != 'perm_pass':
            return Response(checkUser)

        new_name = request.POST['new_group']
        perm_list = json.loads(request.POST['perm_list'])

        new_group = Group.objects.filter(name=new_name)
        if new_group:
            return Response('same name')
        new_group = Group.objects.create(name=new_name)

        for perm in perm_list:
            app_str = perm['content_type'].split('_')[0]
            model_str = perm['content_type'].split('_')[1]
            contentType = ContentType.objects.get(
                app_label=app_str, model=model_str)
            for method in perm['perm_methods']:
                print(method)
                codename = method+'_'+model_str
                permission = Permission.objects.get(
                    content_type=contentType, codename=codename)
                new_group.permissions.add(permission)
        return Response('ok')

