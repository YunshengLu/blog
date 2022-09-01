/*
 * @Description: 分类管理组件
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-30 00:48:10
 */
import React, { useEffect } from 'react';
import {
    Table,
    Button,
    Input,
    Breadcrumb,
    Card,
    Modal,
    Form,
    Message,
    Popconfirm,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import * as ActionTypes from './store/actionTypes';
import useLocale from '@/utils/useLocale';
import { ReducerState } from '@/store/reducers';
import styles from './style/index.module.less';
import { create, getList, remove, update } from '@/api/request/categories';
import { EditableRow, EditableCell } from './edit';

interface rowData {
    id: string;
    name: string;
    articleNum: number;
    createTime: string;
    updateTime: string;
}

const FormItem = Form.Item;
/**
 * @name: form表单布局
 * @msg:
 * @return {*}
 */
const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};

const Categories = () => {
    const locale = useLocale();
    const dispatch = useDispatch();
    const categoriesState = useSelector(
        (state: ReducerState) => state.categories
    );
    const { data, pagination, loading, formParams, visible, confirmLoading } =
        categoriesState;

    const [form] = Form.useForm();

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: '文章数量',
            dataIndex: 'articleNum',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
        },
        {
            title: locale['searchTable.columns.operations'],
            dataIndex: 'operations',
            render: (_, record) => (
                <div className={styles.operations}>
                    {/* <Button type="text" size="small">
            {locale['searchTable.columns.operations.update']}
          </Button> */}
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
    function onSearch(name) {
        fetchData(1, pagination.pageSize, { name });
    }

    /**
     * @name: 添加分类弹窗状态改变
     * @msg:
     * @return {*}
     */
    const onAdd = () => {
        dispatch({
            type: ActionTypes.TOGGLE_VISIBLE,
            data: {
                visible: true,
            },
        });
    };

    /**
     * @name: 关闭添加分类弹窗
     * @msg:
     * @return {*}
     */
    const onCancel = () => {
        dispatch({
            type: ActionTypes.TOGGLE_VISIBLE,
            data: {
                visible: false,
            },
        });
        // 清空表单
        form.resetFields();
    };

    /**
     * @name: 添加分类表单提交
     * @msg:
     * @return {*}
     */
    const onOk = async () => {
        await form.validate();
        const data = form.getFields(); // 取出表单值
        dispatch({
            type: ActionTypes.TOGGLE_CONFIRM_LOADING,
            data: {
                confirmLoading: true,
            },
        });
        const res: any = await create(data);
        console.log(res);
        // code为零添加成功
        if (res.code === 0) {
            dispatch({
                type: ActionTypes.TOGGLE_CONFIRM_LOADING,
                data: {
                    confirmLoading: false,
                },
            });
            // 关闭窗口
            onCancel();
            // 更新分类表单
            fetchData();
            Message.success(res.msg);
        } else {
            Message.success('添加失败，请重新添加!');
            dispatch({
                type: ActionTypes.TOGGLE_CONFIRM_LOADING,
                data: {
                    confirmLoading: false,
                },
            });
        }
    };

    /**
     * @name: 修改分类
     * @msg:
     * @param {*} row
     * @return {*}
     */
    const onHandleSave = async (row: rowData) => {
        // console.log(row);
        const res: any = await update(row);
        // console.log(res);
        const { code, msg } = res;
        if (code === 0) {
            Message.success(msg);
            fetchData();
        } else {
            Message.error('修改失败，请重试');
        }
    };

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
                <Breadcrumb.Item>分类管理</Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false}>
                <div className={styles.toolbar}>
                    <div>
                        <Button onClick={onAdd} type="primary">
                            添加分类
                        </Button>
                    </div>
                    <div>
                        {/* <DatePicker.RangePicker style={{ marginRight: 8 }} onChange={onDateChange} /> */}
                        <Input.Search
                            style={{ width: 300 }}
                            searchButton
                            placeholder="请输入分类名称"
                            onSearch={onSearch}
                        />
                    </div>
                </div>
                <Table
                    rowKey="id"
                    loading={loading}
                    onChange={onChangeTable}
                    pagination={pagination}
                    columns={columns.map((column) =>
                        column.editable
                            ? {
                                ...column,
                                onCell: () => ({
                                    onHandleSave,
                                }),
                            }
                            : column
                    )}
                    data={data}
                    components={{
                        body: {
                            row: EditableRow,
                            cell: EditableCell,
                        },
                    }}
                    className={styles['table-demo-editable-cell']}
                />

                <Modal
                    title={<div style={{ textAlign: 'left' }}>添加分类</div>}
                    visible={visible}
                    onOk={onOk}
                    confirmLoading={confirmLoading}
                    onCancel={onCancel}
                >
                    <Form {...formItemLayout} form={form}>
                        <FormItem
                            label="分类名称"
                            field="name"
                            rules={[
                                { required: true, message: '请输入分类名称' },
                            ]}
                        >
                            <Input placeholder="请输入分类名称" />
                        </FormItem>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default Categories;
