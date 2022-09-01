/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-09-01 14:10:17
 * @LastEditTime: 2022-09-01 14:33:59
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    // config/plugin.js
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks',
    },
};
