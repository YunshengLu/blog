'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    // config/plugin.js
    // 模板
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks',
    },

    // 参数校验
    validate: {
        enable: true,
        package: 'egg-validate',
    },

    // mongodb 数据库
    mongoose: {
        enable: true,
        package: 'egg-mongoose',
    },

    // json web token
    jwt: {
        enable: true,
        package: 'egg-jwt',
    },
};
