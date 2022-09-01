/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-09-01 14:53:42
 * @LastEditTime: 2022-09-01 14:56:17
 */
'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        const { ctx } = this;
        const dataList = {
            list: [
                { id: 1, title: 'this is news 1', url: '/news/1' },
                { id: 2, title: 'this is news 2', url: '/news/2' },
            ],
        };
        await ctx.render('news/list.tpl', dataList);
    }
}

module.exports = NewsController;
