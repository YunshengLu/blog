/**
 * @name 首页配置
 * @param {*} app 
 * @returns 
 */
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const HomeSchema = new Schema(
        {
            // 简介
            introduction: {
                type: 'string',
                min: 2,
                max: 100,
            },
            // 是否开启简介打字动画
            effects: {
                type: 'boolean',
                default: false,
            },
            // 归档页背景图
            archiveBgImg: {
                type: 'string',
            },
            // 分类页背景图
            categoriesBgImg: {
                type: 'string',
            },
            // 分类详情页背景图
            categoriesDetailBgImg: {
                type: 'string',
            },
            // 标签页背景图
            tagsBgImg: {
                type: 'string',
            },
            // 标签详情页背景图
            tagsDetailBgImg: {
                type: 'string',
            },
            // 关于页背景图
            aboutBgImg: {
                type: 'string',
            },
            createTime: {
                type: 'number',
                default: 0,
            },
            updateTime: {
                type: 'number',
                default: 0,
            },
        },
        {
            collection: 'home',
            versionKey: false,
        }
    );
    return mongoose.model('Home', HomeSchema);
};
