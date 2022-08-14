import { Dispatch } from 'redux';
import * as ActionTypes from '../constants';
import {
    postLoginRequest,
    postRegisterRequest,
    postAutoLoginRequest,
    postLogoutRequest,
    getArticleListRequest,
    deleteArticleRequest,
} from '@/api/request';
import { setToken } from '@/utils/token';

// 登录
export const postLogin = (data: any) => ({
    type: ActionTypes.POST_USERLOGIN,
    data,
});
export const postLoginAction = (data: string) => {
    return (dispatch: Dispatch) => {
        return postLoginRequest(data).then((loginResult: any) => {
            const token = loginResult.token;
            if (token){
                setToken(token);
            }
            console.log(loginResult, '++++++++++++++登录');
            dispatch(postLogin(loginResult));
        });
    };
};


// 注册
export const postRegister = (data: any) => ({
    type: ActionTypes.POST_USERREGISTER,
    data,
});
export const postRegisterAction = (data: string) => {
    return (dispatch: Dispatch) => {
        return postRegisterRequest(data).then(registerResult => {
            console.log(registerResult, '++++++++++++++注册');
            dispatch(postRegister(registerResult));
        });
    };
};


// 自动登录
export const postAutoLogin = (data: any) => ({
    type: ActionTypes.POST_AUTOLOGIN,
    data,
})
export const postAutoLoginAction = () => {
    return (dispatch: Dispatch) => {
        return postAutoLoginRequest().then((response) => {
            dispatch(postAutoLogin(response))
        })
    }
}

// 获取文章列表
export const getArticleList = (data: any) => ({
    type: ActionTypes.GET_ARTICLE_LIST,
    data,
})
export const getArticleListAction = (data: any) => {
    return (dispatch: Dispatch) => {
        return getArticleListRequest(data).then(response => {
            dispatch(getArticleList(response))
        })
    }
}

// 删除文章
export const deleteArticle = (data: any) => ({
    type: ActionTypes.DELETE_ARTICLE,
    data,
})
export const deleteArticleAction = (data: number | undefined) => {
    return (dispatch: Dispatch) => {
        return deleteArticleRequest(data).then(response => {
            dispatch(deleteArticle(response))
        })
    }
}




