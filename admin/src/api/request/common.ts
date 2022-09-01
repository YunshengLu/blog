/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-29 23:52:35
 */
import { request } from '@/api/config';

// 上传图片
export async function upload(data) {
  return request({
    url: '/upload',
    method: 'POST',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
