/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-20 01:36:53
 * @LastEditTime: 2022-08-26 00:54:41
 */
import axios from 'axios';
import { Notification } from '@arco-design/web-react';

const baseURL = '/api/v1';
const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});

// const request = (config) => {

//   // 请求拦截
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       if (config.method === 'put' || config.method === 'delete') {
//         const id = config.data._id || config.data.id;
//         config.url = config.url + `/${id}`;
//       }
//       console.log('config', config);
//       const token = localStorage.getItem('token');
//       config.headers = {
//         Authorization: 'Bearer ' + token,
//         ...config.headers,
//       };
//       return config;
//     }
//     // () => {}
//   );

//   // 响应拦截
//   axiosInstance.interceptors.response.use(
//     (res) => {
//       console.log('res-------', res);
//       return res.data ? res.data : res;
//     },
//     (error) => {
//       console.log('error===', error.response); // 注意这里必须打印error.response
//       const response = error.response;
//       if (response && response.status) {
//         if (response.status === 403) {
//           // location.href = '/403';
//           location.href = '/#/admin/login';
//           Notification.error({ title: '权限错误', content: response.data.msg });
//         }
//         if (response.status === 401) {
//           // location.href = '/401';
//           location.href = '/#/admin/login';
//           Notification.error({
//             title: 'Token错误',
//             content: 'token过期，请重新登录',
//           });
//         }
//       }
//     }
//   );
//   return axiosInstance(config);

// };

const request = (config) => {
  // 请求拦截
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.method === 'put' || config.method === 'delete') {
        config.url += config.data._id || config.data.id;
      }
      // console.log(config);
      return config;
    }
    // (error) => {}
  );

  // 响应拦截
  axiosInstance.interceptors.response.use(
    (res) => {
      return res?.data ? res.data : res;
    },
    (error) => {
      console.log('error===', error.response); // 注意这里必须打印error.response
    }
  );

  return axiosInstance(config);
};

export { request };
