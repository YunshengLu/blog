'use strict';

const Controller = require('egg').Controller;

class AboutController extends Controller {
    constructor(ctx) {
        super(ctx);
        // validate 创建校验规则
        this.createRule = {
            // 图片
            imgs: {
                type: 'array',
                itemType: 'object',
                min: 1,
                max: 3,
                rule: {
                    imgUrl: 'url',
                    link: {
                        type: 'string',
                        required: false,
                    },
                },
            },
            // 描述
            desc: {
                type: 'string',
                min: 1,
                max: 800,
            },
            // 标签云
            tags: {
                type: 'array',
                itemType: 'string',
                min: 1,
                max: 20,
            },
            // 个人简历显示开关状态
            showResume: {
                type: 'boolean',
                default: false,
            },
        };
    }

    /**
     * @name 查询
     */
    async index() {
        const { ctx, service } = this;
        const res = await service.about.index();
        ctx.helper.success({
            ctx,
            res,
        });
    }

    /**
     * @name 创建关于
     */
    async create() {
        const { ctx, service } = this;
        const data = ctx.request.body;
        ctx.validate(this.createRule, data);
        const res = await service.about.create(data);
        ctx.helper.success({
            ctx,
            res,
        });
    }

    /**
     * @name 更新
     */
    async update() {
        const { ctx, service } = this;
        const data = ctx.request.body;
        const id = ctx.params.id;
        ctx.validate(this.createRule, data);
        const res = await service.about.update({
            id,
            ...data,
        });
        ctx.helper.success({
            ctx,
            res,
        });
    }
}

module.exports = AboutController;
