// app/extend/helper.js
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {
    moment,
    /**
     * @name 加密
     * @param {输入的密码} password
     * @returns promise
     */
    genSaltPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    if (!err) {
                        resolve(hash);
                    } else {
                        reject(err);
                    }
                });
            });
        });
    },

    /**
     *
     * @param {未加密的密码} _password
     * @param {数据库保存的已加密密码} password
     * @return boolen 是否匹配
     */
    comparePassword(_password, password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) {
                    resolve(isMatch);
                } else {
                    reject(err);
                }
            });
        });
    },

    /**
     * @name 登录反馈
     * @param {*} param0
     */
    success({ ctx, res = null }) {
        ctx.status = res.status ? res.status : 200;
        if (res.status) {
            delete res.status;
        }
        ctx.body = {
            ...res,
            data: res.data ? res.data : null,
            code: res.code ? res.code : 0, // 0 代表成功， 其他为失败
            msg: res.msg ? res.msg : '请求成功',
        };
    },

    /**
     * @name 过滤搜索标签params.name
     * @param {*} params 
     * @returns 
     */
    filterEmptyField(params) {
        let pam = {};
        for (let item in params) {
            if (params[item]) {
                if (item !== 'page' && item !== 'pageSize') {
                    pam[item] = params[item];
                }
            }
        }
        return pam;
    },

    getTimeQueryCon(params) {
        let timeQuery = {};

        // createStartTime		否	number	10位时间戳  2022-8-26 2022-8-27
        // createEndTime		否	number	10位时间戳   2022-8-27
        // updateStartTime		否	number	10位时间戳
        // updateEndTime

        if (params.createStartTime) {
            timeQuery.createTime = { $gte: params.createStartTime };
        }
        if (params.createEndTime) {
            timeQuery.createTime = { $lte: params.createEndTime };
        }
        if (params.createStartTime && params.createEndTime) {
            timeQuery.createTime = {
                $gte: params.createStartTime,
                $lte: params.createEndTime,
            };
        }

        if (params.updateStartTime) {
            timeQuery.updateTime = { $gte: params.updateStartTime };
        }
        if (params.updateEndTime) {
            timeQuery.updateTime = { $lte: params.updateEndTime };
        }
        if (params.updateStartTime && params.updateEndTime) {
            timeQuery.updateTime = {
                $gte: params.updateStartTime,
                $lte: params.updateEndTime,
            };
        }

        return timeQuery;
    },
};
