// app/service/admin.js
const Service = require('egg').Service;

class AdminService extends Service {
    /**
     * @name 创建用户
     * @param {*} body
     * @returns {"_id":"","userName":"","password":""}
     */
    async adminLogin(params) {
        const { ctx, app } = this;
        const oldUser = await ctx.model.Admin.findOne({ userName: params.userName });
        // console.log(oldUser);
        if (!oldUser) {
            return {
                msg: '用户不存在'
            }
        }
        const isMatch = await ctx.helper.comparePassword(params.password, oldUser.password);
        // console.log('isMatch', isMatch);
        if(!isMatch) {
            return {
                msg: '用户名或密码错误'
            }
        }
        const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, {
            expiresIn: 12 * 60 * 60 * 1000,
        });

        ctx.cookies.set('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return {
            data: {
                token,
                userName: oldUser.userName
            },
            msg: "登录成功"
        }

        // const res = await ctx.model.Admin.create(params);
        // console.log(res);
        // return res;
    }

    // /**
    //  * @name 查询全部用户
    //  * @param {}
    //  * @returns All {"_id":"","userName":"","password":""}
    //  */
    // async list() {
    //     const { ctx } = this;
    //     const res = await ctx.model.Admin.find();
    //     return res;
    // }

    /**
     * @name 退出登录
     * @param {*}
     * @returns msg
     */
    async adminLogout() {
        const { ctx } = this;
        ctx.cookies.set('token', '', {
            maxAge: 0
        });
        return {
            msg: '退出登录成功'
        }
    }
}

module.exports = AdminService;
