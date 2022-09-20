module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const AboutSchema = new Schema(
        {
            // 图片
            imgs: [
                {
                    imgUrl: { type: 'string' },
                    link: { type: 'string', required: false },
                },
            ],
            // 描述
            desc: {
                type: 'string',
                min: 1,
                max: 800,
            },
            // 标签云
            tags: [String],
            createTime: {
                type: 'number',
                default: 0,
            },
            updateTime: {
                type: 'number',
                default: 0,
            },
            // 个人简历显示开关状态
            showResume: {
                type: 'boolean',
                default: false,
            },
        },
        {
            collection: 'about',
            versionKey: false,
        }
    );
    return mongoose.model('About', AboutSchema);
};
