/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-09-01 14:10:17
 * @LastEditTime: 2022-09-02 02:57:17
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app, config } = this;
    console.log('ctx.request:', config.env);
    ctx.body = 'hi, egg';
    await app.runSchedule('console');
  }
}

module.exports = HomeController;
