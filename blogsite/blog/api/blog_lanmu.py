from rest_framework.response import Response
from rest_framework.decorators import api_view
from blog.api.userLoginAndPerm import userLoginAndPerm
from blog.models import Lanmu
import json

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def blog_lanmu(request):
    if request.method == "GET":
        lanmu = Lanmu.objects.filter(belong=None)

        lanmu_data = loopGetLanmu(lanmu)
        return Response(lanmu_data)

    if request.method == "DELETE":
        token = request.headers['authorization']
        permList = [
            'blog.delete_lanmu'
        ]
        checkUser = userLoginAndPerm(token, permList)
        print(checkUser)
        if checkUser != 'perm_pass':
            return Response(checkUser)

        lanmu_id = request.POST['id']

        lanmu = Lanmu.objects.get(id=lanmu_id)
        lanmu.delete()
        return Response('ok')

    if request.method == "PUT":
        token = request.headers['authorization']
        permList = [
            'blog.add_lanmu',
            'blog.delete_lanmu',
            'blog.change_lanmu',
            'blog.view_lanmu'
        ]
        checkUser = userLoginAndPerm(token, permList)
        print(checkUser)
        if checkUser != 'perm_pass':
            return Response(checkUser)

        lanmu_tree = json.loads(request.POST['lanmu_tree'])

        print(lanmu_tree)
        loopSaveLanmu(lanmu_tree, None)
        return Response('ok')



# 循环获取栏目数据
def loopGetLanmu(lanmu_list):
    lanmu_data = []
    for lanmu in lanmu_list:
        lanmu_item = {
            "id": lanmu.id,
            "label": lanmu.name,
            "children": [],
            "article_num": len(lanmu.article_lanmu.all())
        }
        children = lanmu.lanmu_children.all()
        print(lanmu)
        print(children)
        if children:
            children_data = loopGetLanmu(children)
            for c in children_data:
                lanmu_item['children'].append(c)
        lanmu_data.append(lanmu_item)
    return lanmu_data


# 循环保存栏目树形结构
def loopSaveLanmu(tree_data, parent_id):
    parent_lanmu = Lanmu.objects.filter(id=parent_id)
    if parent_lanmu:
        for tree in tree_data:
            saved_lanmu = Lanmu.objects.filter(id=tree['id'])
            if saved_lanmu:
                saved_lanmu[0].belong = parent_lanmu[0]
                saved_lanmu[0].save()
                if len(tree['children']) > 0:
                    loopSaveLanmu(tree['children'], saved_lanmu[0].id)
            else:
                new_lanmu = Lanmu(name=tree['label'], belong=parent_lanmu[0])
                new_lanmu.save()
                if len(tree['children']) > 0:
                    loopSaveLanmu(tree['children'], new_lanmu.id)
    else:
        for tree in tree_data:
            saved_lanmu = Lanmu.objects.filter(id=tree['id'])
            if saved_lanmu:
                saved_lanmu[0].belong = None
                saved_lanmu[0].save()
                loopSaveLanmu(tree['children'], saved_lanmu[0].id)
            else:
                new_lanmu = Lanmu(name=tree['label'])
                new_lanmu.save()
                if len(tree['children']) > 0:
                    loopSaveLanmu(tree['children'], new_lanmu.id)

    return
