/*
 * @Descripttion:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-24 23:35:21
 */
import { AnyAction } from 'redux';
import * as ActionTypes from './actionTypes';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
};

export interface UserLoginState {
  userInfo?: {
    userName?: string;
    avatar?: string;
  };
}

const login = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN: {
      const userInfo = {
        ...action.data,
        avatar:
          'https://th.bing.com/th/id/OIP.MtJbfO5Qq3QOdxKC44VZ5AAAAA?w=196&h=196&c=7&r=0&o=5&dpr=2&pid=1.7',
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // state.userInfo = userInfo
      return {
        ...state,
        userInfo: userInfo,
      };
    }
    default:
      return state;
  }
};

export default login;
