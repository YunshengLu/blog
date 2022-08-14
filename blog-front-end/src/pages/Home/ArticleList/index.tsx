import React, { useEffect, useState } from 'react';
import {
    Table,
    Tag,
    Space,
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    DatePicker,
    Select,
    message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { rootState } from '@/store';
import { Link, useNavigate } from 'oh-router-react';
import { Dispatch } from 'redux';
import { ArticleListWrapper, ContainerWrapper } from './style';
import img404 from '@/assets/error.png';
import { deleteArticleRequest } from '@/api/request';
import { AxiosRequestConfig } from 'axios';
import { deleteArticle, deleteArticleAction, getArticleListAction } from '@/store/actionCreators';

interface ArticleListProps {
    articleList: any;
    deleteArticle: any;
    getArticleListActionDispatch: (data: any) => void;
    deleteArticleActionDispatch: (data: number | undefined) => void;
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const ArticleList: React.FC<ArticleListProps> = props => {
    const { articleList, deleteArticle } = props;

    const { getArticleListActionDispatch, deleteArticleActionDispatch } = props;

    // 文章列表管理 统一管理数据 将来修改给setArticleData传对象
    const [articleData, setArticleData] = useState({
        list: [], // 文章列表
        total: 0, // 文章数量
    });

    // 文章参数管理
    const [params, setParams] = useState({
        page: 1,
        pageSize: 4,
    });

    // 翻页实现
    const pageChange = (page: number) => {
        setParams({
            ...params,
            page,
        });
    };

    // 删除文章
    const delArticle = async (data: { id: number }) => {
        console.log(data, '=========');
        await deleteArticleActionDispatch(data.id);
        // 刷新一下列表
        setParams({
            ...params,
        });
    };

    // 编辑文章
    const navigate = useNavigate();
    const goPublish = (data: { id: AxiosRequestConfig<number> | undefined }) => {
        // navigate(`/publish?id=${data.id}`);
    };

    useEffect(() => {
        setArticleData({
            list: articleList.data,
            total: articleList.total,
        });
    }, [articleList]);
    // 获取文章列表
    useEffect(() => {
        getArticleListActionDispatch(params);
    }, [params]);

    useEffect(() => {
        console.log(deleteArticle, '=============');
        if (deleteArticle.code === 0) {
            message.error('没有权限');
        }
        setParams({
            ...params,
            // page: 1,
        });
    }, [deleteArticle]);

    const columns: ColumnsType<DataType> = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 220,
            render: (cover: any) => {
                return (
                    <img src={articleList.data[0].cover || img404} width={80} height={60} alt="" />
                );
            },
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220,
        },
        {
            title: '作者',
            dataIndex: 'nickName',
            width: 220,
        },
        {
            title: '操作',
            render: (data: any) => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => goPublish(data)}
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => delArticle(data)}
                        />
                    </Space>
                );
            },
            fixed: 'right',
        },
    ];

    return (
        <ContainerWrapper>
            {/* 面包屑导航 */}
            <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/articlelist">文章列表</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            {/* 文章列表 */}
            <ArticleListWrapper>
                {/* 文章列表区域 */}
                <Card title={`共查询到 ${articleData.total} 条文章：`}>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={articleData.list}
                        pagination={{
                            pageSize: params.pageSize,
                            total: articleData.total,
                            onChange: pageChange,
                            current: params.page,
                        }}
                        bordered
                    />
                </Card>
            </ArticleListWrapper>
        </ContainerWrapper>
    );
};

const mapStateToProps = (state: rootState) => ({
    articleList: state.articleList,
    deleteArticle: state.deleteArticle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getArticleListActionDispatch(data: any) {
        dispatch(getArticleListAction(data));
    },
    deleteArticleActionDispatch(data: any) {
        dispatch(deleteArticleAction(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
