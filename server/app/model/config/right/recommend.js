module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const RightRecommendSchema = new Schema(
        {
            // 1=电影，2=电视剧，3=音乐
            project: {
                type: 'string',
            },
            showPosition: {
                type: [String],
                min: 1,
                max: 10,
            },
            name: {
                type: 'string',
                min: 1,
                max: 50,
            },
            cover: {
                type: 'string',
            },
            link: {
                type: 'string',
            },
            // 平台
            platform: {
                type: 'string',
                min: 1,
                max: 20,
            },
            isVip: {
                type: 'boolean',
                default: false,
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
            collection: 'right_recommend',
            versionKey: false,
        }
    );
    return mongoose.model('RightRecommend', RightRecommendSchema);
};
