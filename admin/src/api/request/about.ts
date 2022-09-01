/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-26 01:50:31
 */
import { request } from '@/api/config';

export async function queryAbout() {
    return request({
        url: '/about',
    });
}

export async function addAbout(data) {
    return request({
        url: '/about',
        method: 'post',
        data,
    });
}
export async function updateAbout(data) {
    return request({
        url: '/about',
        method: 'put',
        data,
    });
}



