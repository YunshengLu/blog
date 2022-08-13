import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd';
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
import { getActicleListAction } from '@/store/actionCreators';

interface ArticleListProps {
    acticleList: any;
    getActicleListActionDispatch: (data: any) => void;
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const ArticleList: React.FC<ArticleListProps> = props => {

    const {
        acticleList
    } = props;

    const {
        getActicleListActionDispatch
    } = props;

    // 文章列表管理 统一管理数据 将来修改给setArticleData传对象
    const [articleData, setArticleData] = useState({
        list: [], // 文章列表
        total: 0, // 文章数量
    });

    // 文章参数管理
    const [params, setParams] = useState({
        page: 1,
        pageSize: 10,
    });
    useEffect(() => {
        setArticleData({
            list: acticleList.data,
            total: acticleList.total
        })
    }, [acticleList]);
    // 获取文章列表
    useEffect(() => {
        getActicleListActionDispatch(params)
    }, [params]);

    // 翻页实现
    const pageChange = (page: number) => {
        setParams({
            ...params,
            page,
        });
    };

    // 删除文章
    const delArticle = async (data: { id: number; }) => {
        console.log(data,'=========');
        
        await deleteArticleRequest(data.id);
        // 刷新一下列表
        setParams({
            ...params,
            page: 1,
        });
    };

    // 编辑文章
    const navigate = useNavigate();
    const goPublish = (data: { id: AxiosRequestConfig<number> | undefined }) => {
        // navigate(`/publish?id=${data.id}`);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 220,
            render: (cover: any) => {
                return <img src={ acticleList.data[0].cover || img404} width={80} height={60} alt="" />;
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
    acticleList: state.acticleList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getActicleListActionDispatch(data: any) {
        dispatch(getActicleListAction(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
