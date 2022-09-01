/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-09-01 14:10:17
 * @LastEditTime: 2022-09-01 14:49:04
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1662012585290_2058';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    defaultViewRngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
