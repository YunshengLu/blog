/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-26 01:49:53
 */
import { request } from '@/api/config';

export async function getList(params) {
    return request({
        url: '/tags',
        params,
    });
}

export async function create(data) {
    return request({
        url: '/tags',
        method: 'post',
        data,
    });
}
export async function update(data) {
    return request({
        url: '/tags',
        method: 'put',
        data,
    });
}

export async function remove(data) {
    return request({
        url: '/tags',
        method: 'delete',
        data,
    });
}

export async function updateStatus(data) {
    return request({
        url: `/tags/status`,
        method: 'put',
        data,
    });
}

