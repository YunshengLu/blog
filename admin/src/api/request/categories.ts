/*
 * @Description: 分类管理
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-29 23:52:54
 */
import { request } from '@/api/config';

// 拿取分类数据
export async function getList(params) {
    return request({
        url: '/categories',
        params,
    });
}

// 添加新分类
export async function create(data) {
    return request({
        url: '/categories',
        method: 'post',
        data,
    });
}

// 更改分类
export async function update(data) {
    return request({
        url: '/categories',
        method: 'put',
        data,
    });
}

// 删除分类
export async function remove(data) {
    return request({
        url: '/categories',
        method: 'delete',
        data,
    });
}

