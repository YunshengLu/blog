/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-09-01 02:33:58
 * @LastEditTime: 2022-09-01 02:49:06
 */
import { PaginationProps } from '@arco-design/web-react/es/Pagination/pagination';
import {
    UPDATE_LIST,
    UPDATE_LOADING,
    UPDATE_PAGINATION,
    UPDATE_FORM_PARAMS,
    TOGGLE_VISIBLE,
    TOGGLE_CONFIRM_LOADING,
} from './actionTypes';

const initialState = {
    data: [],
    pagination: {
        sizeCanChange: true,
        showTotal: true,
        pageSize: 20,
        current: 1,
        pageSizeChangeResetCurrent: true,
    },
    loading: true,
    formParams: {},
    visible: false,
    confirmLoading: false,
};

interface FormParams {
    [key: string]: string;
}

export interface RecommendState {
    data?: any[];
    pagination?: PaginationProps;
    formParams?: FormParams;
    loading?: boolean;
    visible?: boolean;
    confirmLoading?: boolean;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_LIST: {
            const { data } = action.data;

            return {
                ...state,
                data,
            };
        }
        case UPDATE_LOADING: {
            const { loading } = action.data;
            return {
                ...state,
                loading,
            };
        }
        case UPDATE_PAGINATION: {
            const { pagination } = action.data;
            return {
                ...state,
                pagination,
            };
        }
        case UPDATE_FORM_PARAMS: {
            const { params } = action.data;
            return {
                ...state,
                formParams: params,
            };
        }
        case TOGGLE_VISIBLE: {
            const { visible } = action.data;
            return {
                ...state,
                visible,
            };
        }

        case TOGGLE_CONFIRM_LOADING: {
            const { confirmLoading } = action.data;
            return {
                ...state,
                confirmLoading,
            };
        }

        default:
            return state;
    }
}
