/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-09-01 01:35:01
 */
import { request } from '@/api/config';

export async function queryIntroduction() {
    return request({
        url: '/config/right/introduction',
    });
}

export async function addIntroduction(data) {
    return request({
        url: '/config/right/introduction',
        method: 'post',
        data,
    });
}
export async function updateIntroduction(data) {
    return request({
        url: '/config/right/introduction',
        method: 'put',
        data,
    });
}

export async function queryAd() {
    return request({
        url: '/config/right/ad',
    });
}

export async function addAd(data) {
    return request({
        url: '/config/right/ad',
        method: 'post',
        data,
    });
}
export async function updateAd(data) {
    return request({
        url: '/config/right/ad',
        method: 'put',
        data,
    });
}

export async function getListRecommend(params) {
    return request({
        url: '/config/right/recommend',
        params,
    });
}
export async function createRecommend(data) {
    return request({
        url: '/config/right/recommend',
        method: 'post',
        data,
    });
}
export async function updateRecommend(data) {
    return request({
        url: '/config/right/recommend',
        method: 'put',
        data,
    });
}

export async function removeRecommend(data) {
    return request({
        url: '/config/right/recommend',
        method: 'delete',
        data,
    });
}
