import { router } from '@/router';
import { getToken, removeToken } from '@/utils/token';
import { message } from 'antd';
import axios from 'axios';

export const baseURL = 'http://localhost:8000/api/';
// axios 的实例及拦截配置
const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(config => {
    let token = getToken();
    if (token) config.headers!['authorization'] = token;
    return config;
});

// 响应时
axiosInstance.interceptors.response.use(
    res => {
        console.log(res.data, '@@@@@@@@@@@@');
        if (res.data.code === -1) {
            throw Error(res.data.data);
        }
        if (res.data?.status === 401) {
            router.navigate('/login');
            message.error('请重新登录');
            removeToken()
            return new Promise(() => {});
        }
        return res.data;
    },
    err => {
        console.log(err, '网络错误');
    }
);

export { axiosInstance };
