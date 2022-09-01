/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-26 01:50:48
 */
import { request } from '@/api/config';

export async function getList(params) {
    return request({
        url: '/comment',
        params,
    });
}

export async function remove(data) {
    return request({
        url: '/comment',
        method: 'delete',
        data,
    });
}
export async function updateCommentStatus(data) {
    return request({
        url: '/comment',
        method: 'put',
        data,
    });
}
