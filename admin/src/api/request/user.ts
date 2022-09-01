/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-26 01:51:03
 */
import { request } from '@/api/config';

export async function getList(params) {
    return request({
        url: '/user',
        params,
    });
}

export async function remove(data) {
    return request({
        url: '/user',
        method: 'delete',
        data,
    });
}

