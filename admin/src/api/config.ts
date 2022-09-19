import axios from 'axios';
import { Notification } from '@arco-design/web-react';

const request = (config) => {

    const baseUrl = '/api/v1';

    const axiosInstance = axios.create({
        baseURL: baseUrl,
        // timeout: 5000,
    });

    // 请求拦截
    axiosInstance.interceptors.request.use(
        (config) => {
            if (config.method === 'put' || config.method === 'delete') {
                const id = config.data._id || config.data.id;
                config.url = config.url + `/${id}`;
            }
            // console.log('config', config);
            const token = localStorage.getItem('token');
            config.headers = {
                // egg 固定写法，可以修改
                Authorization: 'Bearer ' + token,
                ...config.headers,
            };
            return config;
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
    );

    // 响应拦截
    axiosInstance.interceptors.response.use(
        (res) => {
            console.log('res-------', res);
            return res.data ? res.data : res;
        },
        (error) => {
            console.log('error:', error.response); // 这里必须是error.response
            const response = error.response;
            if (response && response.status) {
                if (response.status === 403) {
                    // location.href = '/403';
                    location.href = '/#/admin/login';
                    Notification.error({
                        title: '权限错误',
                        content: response.data.msg,
                    });
                }
                if (response.status === 401) {
                    // location.href = '/401';
                    location.href = '/#/admin/login';
                    Notification.error({
                        title: 'Token错误',
                        content: 'Token过期，请重新登录',
                    });
                }
            }
        }
    );

    return axiosInstance(config);
};

export { request };
