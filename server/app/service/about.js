const Service = require('egg').Service;

class AboutService extends Service {
    /**
     * @name 查询
     * @returns 
     */
    async index() {
        const { ctx } = this;
        const data = await ctx.model.About.findOne();
        return {
            msg: '关于信息获取成功',
            data,
        };
    }

    /**
     * @name 创建关于
     * @param {*} params 
     * @returns 
     */
    async create(params) {
        const { ctx } = this;
        // 查看数据库中是否存在
        const totalCount = await ctx.model.About.find().countDocuments();
        // 不存在则创建
        if (totalCount === 0) {
            const data = {
                ...params,
                createTime: ctx.helper.moment().unix(),
            };
            const res = await ctx.model.About.create(data);
            return {
                msg: '关于信息添加成功',
                data: res,
            };
        } else {
            return {
                msg: '关于信息已存在',
            };
        }
    }

    /**
     * @name 修改关于信息
     * @param {*} params 
     * @returns 
     */
    async update(params) {
        const { ctx } = this;
        // 查看数据库中是否存在
        const oldAbout = await ctx.model.About.findOne({ _id: params.id });
        // 存在则可以修改
        if (oldAbout) {
            const updateData = {
                ...params,
                createTime: oldAbout.createTime,
                updateTime: ctx.helper.moment().unix(),
            };
            // 通过id查找并修改
            const res = await ctx.model.About.findByIdAndUpdate(
                {
                    _id: params.id,
                },
                updateData,
                {
                    new: true, // 返回修改后的数据
                    runValidators: true, // 执行Validaton验证
                }
            );
            return {
                msg: '关于信息修改成功',
                data: res,
            };
        } else {
            return {
                msg: '关于信息不存在',
            };
        }
    }
}

module.exports = AboutService;
