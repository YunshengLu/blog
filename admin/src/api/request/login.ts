/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-26 01:50:56
 */
import { request } from '@/api/config';

export async function login(data) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data,
  });
}

export async function logout() {
  return request({
    url: '/admin/logout',
    method: 'POST',
  });
}