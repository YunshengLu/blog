'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;
    const baseRouter = app.config.baseRouter; // /api/v1

    // 前台 /web 开头

    router.get('/', controller.home.index);

    // 登录
    router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
    // 退出登录
    router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);


    // 文章
    router.resources('articles', baseRouter + '/articles', jwt, controller.articles);
    // 启用，停用
    router.put(
        baseRouter + "/articles/status/:id",
        jwt,
        controller.articles.changeStatus
    ); 
    // 修改发布状态
    router.put(
        baseRouter + "/articles/publishStatus/:id",
        jwt,
        controller.articles.changePublishStatus
    ); 
    // 一键开启或关闭收藏
    router.post(
        baseRouter + "/articles/collectStatus",
        jwt,
        controller.articles.changeCollectStatus
    ); 


    // 标签
    router.resources('tags', baseRouter + '/tags', jwt, controller.tags);
    // 标签状态修改
    router.put(baseRouter + '/tags/status/:id', jwt, controller.tags.updateStatus);
    // 分类
    router.resources('categories', baseRouter + '/categories', jwt, controller.categories);
    // 关于
    router.resources('about', baseRouter + '/about', jwt, controller.about);
    // 用户
    router.resources('user', baseRouter + '/user', jwt, controller.user);
    // 评论
    router.resources('comment', baseRouter + '/comment', jwt, controller.comment);
    // 网页配置-首页配置
    router.resources('home', baseRouter + '/config/home', jwt, controller.config.home);
    // 网页配置-Header-Footer配置
    router.resources('hf', baseRouter + '/config/hf', jwt, controller.config.hf);
    // 网页配置-侧栏配置-个人简介
    router.resources(
        'right_introduction',
        baseRouter + '/config/right/introduction',
        jwt,
        controller.config.right.introduction
    );
    // 网页配置-侧栏配置-广告设置
    router.resources(
        'right_ad', 
        baseRouter + '/config/right/ad', 
        jwt, 
        controller.config.right.ad
    );
    // 网页配置-侧栏配置-推荐设置
    router.resources(
        "right_recommend",
        baseRouter + "/config/right/recommend",
        jwt,
        controller.config.right.recommend
    ); 
};

// model -> router -> controller -> service -> model
// 数据库 mysql mongodb 模型 Model
