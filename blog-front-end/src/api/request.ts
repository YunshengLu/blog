import { getToken } from "@/utils/token";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./config";
import {
    URL_LOGIN, 
    URL_REGISTER,
    URL_CHECKPERM,
    URL_LOGOUT,
    URL_AUTO_LOGIN,
    URL_ARTICLE_LIST,
    URL_DEFAULT_ARTICLE,
} from "./url"
// import Qs from "qs";
// import axios from "axios";

// 权限判断
export const CheckUserPerm = (checkInfo: { contentType: string; permissions: Array<string>; }) => {
    let token = getToken()
    let contentType = checkInfo.contentType;
    let permissions = checkInfo.permissions;
    return axiosInstance.post(URL_CHECKPERM, {
        token,
        contentType,
        permissions
    })
}

// 登录
export const postLoginRequest = (formData: string) =>{
    // let data = Qs.stringify(formData);
    // console.log(data,'&&&&&&&&&&&&');
    return axiosInstance.post(URL_LOGIN, formData)
    // return axiosInstance({
    //     url: URL_LOGIN,
    //     method: 'POST',
    //     headers:{'Content-Type':"application/json"},
    //     data: formData
    // })
}

// 注册
export const postRegisterRequest = (formData: string) => {
    return axiosInstance.post(URL_REGISTER, formData)
}

// 自动登录
export const postAutoLoginRequest = () => {
    return axiosInstance.post(URL_AUTO_LOGIN)
}

// 退出登录
export const postLogoutRequest = (token: string) => {
    return axiosInstance.post(URL_LOGOUT, token)
}

// 获取文章列表
export const getArticleListRequest = (data: { 
    page: number; 
    pageSize: number;
}) => {
    const url = `${URL_ARTICLE_LIST}?page=${data.page}&pageSize=${data.pageSize}`
    return axiosInstance.get(url)
}

// 删除文章
export const deleteArticleRequest = (id: number | undefined) => {
    const url = `${URL_DEFAULT_ARTICLE}?id=${id}` 
    return axiosInstance.delete(url)
}