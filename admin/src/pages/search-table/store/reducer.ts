/*
 * @Descripttion: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-23 23:53:09
 */
import { PaginationProps } from '@arco-design/web-react/es/Pagination/pagination';
import * as ActionTypes  from './actionTypes';

const initialState = {
  data: [],
  pagination: {
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  },
  loading: true,
  formParams: {},
};

interface FormParams {
  [key: string]: string;
}

export interface SearchTableState {
  data?: any[];
  pagination?: PaginationProps;
  formParams?: FormParams;
  loading?: boolean;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_LIST: {
      const { data } = action.data;

      return {
        ...state,
        data,
      };
    }
    case ActionTypes.UPDATE_LOADING: {
      const { loading } = action.data;
      return {
        ...state,
        loading,
      };
    }
    case ActionTypes.UPDATE_PAGINATION: {
      const { pagination } = action.data;
      return {
        ...state,
        pagination,
      };
    }
    case ActionTypes.UPDATE_FORM_PARAMS: {
      const { params } = action.data;
      return {
        ...state,
        formParams: params,
      };
    }
    default:
      return state;
  }
}
