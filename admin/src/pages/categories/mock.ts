/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-24 23:57:55
 * @LastEditTime: 2022-08-30 00:45:44
 */
import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '@/utils/setupMock';

const Random = Mock.Random;

const data = Mock.mock({
    'list|55': [
        {
            '_id|8': /[A-Z][a-z][-][0-9]/,
            'name|4-8': /[A-Z]/,
            articleNum: 0,
            // 'articleNum|1-4': /[1-9]/,
            createTime: Random.datetime(),
            updateTime: Random.datetime(),
        },
    ],
});

setupMock({
    setup() {
        Mock.mock(new RegExp('/api/v1/categories'), (params) => {
            switch (params.type) {
                case 'DELETE':
                    const delBody = JSON.parse(params.body);
                    const idx = data.list.findIndex(
                        (item) => item._id === delBody._id
                    );
                    data.list.splice(idx, 1);
                    return {
                        msg: '分类删除成功',
                        data: null,
                        code: 0,
                    };
                case 'PUT':
                    const body = JSON.parse(params.body);
                    const index = data.list.findIndex(
                        (item) => item._id === body._id
                    );
                    data.list[index] = { ...data.list[index], ...body };
                    return {
                        msg: '分类修改成功',
                        data: null,
                        code: 0,
                    };
                case 'POST':
                    const { name } = JSON.parse(params.body);
                    const returnData = Mock.mock({
                        'id|8': /[A-Z][a-z][-][0-9]/,
                        name,
                        articleNum: 0,
                        createTime: Random.datetime(),
                        updateTime: Random.datetime(),
                    });

                    data.list.unshift(returnData);

                    return {
                        msg: '分类添加成功',
                        code: 0,
                        ...returnData,
                    };
                case 'GET':
                default:
                    const { page = 1, pageSize = 10 } = qs.parseUrl(
                        params.url
                    ).query;
                    const p = page as number;
                    const ps = pageSize as number;

                    return {
                        list: data.list.slice((p - 1) * ps, p * ps),
                        totalCount: 55,
                    };
            }
        });
    },
});
