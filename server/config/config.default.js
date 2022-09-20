/* eslint valid-jsdoc: "off" */

'use strict';

const userConfig = require('./config.user');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1662012585290_2058';

    // add your middleware config here
    config.middleware = ['errorHandler', 'auth'];

    // 模板
    config.view = {
        defaultViewRngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };

    // csrf 安全
    config.security = {
        csrf: {
            enable: false,
            // refererWhiteList: ['http://127.0.0.1:7001']
        },
    };

    // 文件
    config.multipart = {
        mode: 'file',
        fileExtensions: ['.md'], // 增加对 md 扩展名文件的支持
    };

    // session
    config.session = {
        key: 'BLOG_SESSION_KEY',
        encrypt: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    };

    // MongoDB数据库连接
    config.mongoose = {
        url: 'mongodb://127.0.0.1/blog',
        options: {},
    };

    // Configuration 加密打乱配置
    config.jwt = {
        secret: userConfig.userName,
    };

    config.auth = {
        whiteList: [userConfig.userName]
    }

    return {
        ...config,
        ...userConfig,
    };
};
