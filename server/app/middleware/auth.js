module.exports = () => {

    return async function auth(ctx, next) {

        const currentUrl = ctx.request.url;

        // 过滤前台 /web 开头请求
        if (currentUrl.indexOf('/web') !== -1) {
            return await next();
        }

        // 后台校验用户访问权限,登录，退出登录不需要验证
        const urlWhiteList = ['/admin/login', '/admin/logout'];
        // 用户名白名单
        const whiteList = ctx.app.config.auth.whiteList; // ['admin']
        const secret = ctx.app.config.jwt.secret;

        // 是否不需要验证，如果currentUrl在urlWhiteList里面就不需要验证
        let isNoValidate = urlWhiteList.some(item => currentUrl.indexOf(item) !== -1); 
        if (isNoValidate) {
            return await next();
        } else {
            // 拿取请求头中的authorization，前端请求头中携带的是Authorization，这里索引的是小写开头
            const authorization = ctx.request.header.authorization;
            // 如果有token
            if (authorization) {
                const token = authorization.replace('Bearer ', '');
                // verify 解析token
                const decode = await ctx.app.jwt.verify(token, secret);
                const userName = decode._doc.userName;
                if (whiteList.includes(userName)) {
                    await next();
                } else {
                    ctx.helper.success({
                        ctx,
                        res: {
                            status: 403,
                            msg: '无权限访问',
                            code: 0,
                            data: null,
                        },
                    });
                }
            } else {
                await next();
            }
        }
    };
};
