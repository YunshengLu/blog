/*
 * @Description: router
 * @Author: LuyunSheng
 * @Date: 2022-09-01 14:10:17
 * @LastEditTime: 2022-09-01 14:53:19
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
};

// model -> router -> controller -> service -> model
// 数据库 mysql mongodb 模型 Model
