/*
 * @Description: 用户管理组件
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-29 21:45:32
 * @LastEditTime: 2022-08-30 02:22:23
 */
import React, { useEffect } from 'react';
import {
    Table,
    Button,
    Input,
    Breadcrumb,
    Card,
    Message,
    Popconfirm,
    Image,
    Tag,
    Tooltip,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import * as ActionTypes from './store/actionTypes';
import useLocale from '@/utils/useLocale';
import { ReducerState } from '@/store/reducers';
import styles from './style/index.module.less';
import { getList, remove } from '@/api/request/user';

interface rowData {
    id: string;
    name: string;
    articleNum: number;
    createTime: string;
    updateTime: string;
}

const User = () => {
    const locale = useLocale();
    const dispatch = useDispatch();
    const userState = useSelector(
        (state: ReducerState) => state.user
    );
    const { data, pagination, loading, formParams } =
        userState;

    const columns = [
        {
            title: '昵称',
            dataIndex: 'nickName',
            width: 100
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            width: 60,
            render: (_, record) => {
                return <Image width={50} height={50} src={record.avatar} />;
            },
        },
        {
            title: '来源',
            width: 80,
            dataIndex: 'provider',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: '收藏数',
            width: 80,
            dataIndex: 'articleIds',
            render: (_, record) => {
                return <Tag color="orange">{record.articleIds?.length}</Tag>;
            },
        },
        {
            title: '简介',
            width: 400,
            dataIndex: 'introduction',
            render: (text) => {
                return (
                    <Tooltip position="tl" content={text}>
                        {text}
                    </Tooltip>
                );
            },
        },
        {
            title: '注册时间',
            dataIndex: 'registerTime',
        },
        {
            title: locale['searchTable.columns.operations'],
            dataIndex: 'operations',
            render: (_, record) => (
                <div className={styles.operations}>
                    {/* 删除 */}
                    <Popconfirm
                        title="Are you sure you want to delete?"
                        onOk={() => onDelete(record)}
                    >
                        <Button type="text" status="danger" size="small">
                            {locale['searchTable.columns.operations.delete']}
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    /**
     * @name: 获取分类数据
     * @msg:
     * @param {*} current
     * @param {*} pageSize
     * @param {*} params
     * @return {*}
     */
    async function fetchData(current = 1, pageSize = 20, params = {}) {
        dispatch({ type: ActionTypes.UPDATE_LOADING, data: { loading: true } });
        try {
            const postData = {
                page: current,
                pageSize,
                ...params,
            };
            // console.log(postData);
            const res: any = await getList(postData);
            // console.log(res);
            if (res) {
                const { list, totalCount } = res;
                dispatch({
                    type: ActionTypes.UPDATE_LIST,
                    data: { data: list },
                });
                dispatch({
                    type: ActionTypes.UPDATE_PAGINATION,
                    data: {
                        pagination: {
                            ...pagination,
                            current,
                            pageSize,
                            total: totalCount,
                        },
                    },
                });
                dispatch({
                    type: ActionTypes.UPDATE_LOADING,
                    data: { loading: false },
                });
                dispatch({
                    type: ActionTypes.UPDATE_FORM_PARAMS,
                    data: { params },
                });
            }
        } catch (error) {}
    }

    function onChangeTable(pagination) {
        const { current, pageSize } = pagination;
        fetchData(current, pageSize, formParams);
    }

    /**
     * @name: 搜索
     * @msg:
     * @param {*} name
     * @return {*}
     */
    function onSearch(nickName) {
        fetchData(1, pagination.pageSize, { nickName });
    }

    /**
     * @name: 删除分类
     * @msg:
     * @return {*}
     */
    const onDelete = async (row: rowData) => {
        // console.log(row);
        const res: any = await remove(row);
        const { code, msg } = res;
        if (code === 0) {
            Message.success(msg);
            fetchData();
        } else {
            Message.error('删除失败，请重试');
        }
    };

    return (
        <div className={styles.container}>
            <Breadcrumb style={{ marginBottom: 20 }}>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    <div>
                        <Input.Search
                            style={{ width: 300 }}
                            searchButton
                            placeholder="请输入昵称"
                            onSearch={onSearch}
                        />
                    </div>
                </div>
                <Table
                    rowKey="id"
                    loading={loading}
                    onChange={onChangeTable}
                    pagination={pagination}
                    columns={columns}
                    data={data}
                />

            </Card>
        </div>
    );
};

export default User;
