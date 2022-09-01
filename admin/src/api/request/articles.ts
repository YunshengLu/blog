/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-26 01:50:40
 */
import { request } from '@/api/config';

export async function getList(params) {
  return request({
    url: '/articles',
    params,
  });
}

export async function create(data) {
  return request({
    url: '/articles',
    method: 'post',
    data,
  });
}
export async function update(data) {
  return request({
    url: '/articles',
    method: 'put',
    data,
  });
}

export async function queryArticles(params) {
  return request({
    url: `/articles/${params.id}/edit`,
    method: 'get',
  });
}

export async function remove(data) {
  return request({
    url: '/articles',
    method: 'delete',
    data,
  });
}
export async function updateStatus(data) {
  return request({
    url: '/articles/status',
    method: 'put',
    data,
  });
}

export async function updatePublishStatus(data) {
  return request({
    url: '/articles/publishStatus',
    method: 'put',
    data,
  });
}

export async function updateCollectStatus(data) {
  return request({
    url: '/articles/collectStatus',
    method: 'post',
    data,
  });
}
