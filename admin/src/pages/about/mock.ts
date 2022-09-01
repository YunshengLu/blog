/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-30 00:18:22
 * @LastEditTime: 2022-08-30 01:19:10
 */
import Mock from 'mockjs';
import setupMock from '../../utils/setupMock';

const data = {
    tags: ['Vue', 'React', 'Node.js', '小程序', 'Uni-app', 'Egg', 'Serverless'],
    createTime: 1598256646,
    updateTime: 1637546956,
    showResume: false,
    _id: '5f43760694c942f8bc6daaa9',
    desc: '熟悉Vue、React等前端主流框架。具有良好的沟通能力、工作协调能力、不断学习新技术、熟练前端技术、热衷于前端开发。',
    imgs: [
        {
            _id: '619afbcc569543592bdb5da2',
            imgUrl: 'https://xuwenliu.github.io/img/index.jpg',
            link: '',
        },
        {
            _id: '619afbcc569543592bdb5da3',
            imgUrl: 'https://xuwenliu.github.io/img/archive.jpg',
            link: '',
        },
        {
            _id: '619afbcc569543592bdb5da4',
            imgUrl: 'http://nevergiveupt.top/tags.jpg',
            link: '',
        },
    ],
};

setupMock({
    setup() {
        Mock.mock(new RegExp('/api/v1/about'), (params) => {
            // console.log('---', params);
            switch (params.type) {
                case 'PUT':
                    const body = JSON.parse(params.body);
                    return {
                        msg: '关于信息修改成功',
                        data: body,
                        code: 0,
                    };
                case 'POST':
                    const postBody = JSON.parse(params.body);
                    return {
                        msg: '关于信息添加成功',
                        code: 0,
                        data: postBody,
                    };
                case 'GET':
                default:
                    return {
                        msg: '关于信息获取成功',
                        code: 0,
                        data,
                    };
            }
        });
    },
});
