'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
    constructor(ctx) {
        super(ctx);
        // validate 校验规则
        this.createRule = {
            userName: {
                type: 'string',
                min: 5,
                max: 20,
                format: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
            },
            password: {
                type: 'password',
                // compare: 're-password',
                min: 6,
                max: 20,
                format: /^[a-zA-Z0-9_]{6,20}$/,
            },
        };
    }

    async adminLogin() {
        const { ctx, service } = this;
        const data = ctx.request.body;
        ctx.validate(this.createRule, data);
        const res = await service.admin.adminLogin(data);
        ctx.helper.success({
            ctx,
            res,
        });
    }

    async adminLogout() {
        const { ctx, service } = this;
        const res = await service.admin.adminLogout();
        ctx.helper.success({
            ctx,
            res,
        });
    }
}

module.exports = AdminController;
