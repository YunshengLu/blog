import React, { useState } from 'react';
import { HomeWrapper } from './style';
import { Link, Outlet, useLocation } from 'oh-router-react';
import { useMemo } from 'react';
import { router } from '@/router';
import {
    AppstoreOutlined,
    CalendarOutlined,
    AlignRightOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import type { MenuProps, MenuTheme } from 'antd/es/menu';

type MenuItem = Required<MenuProps>['items'][number];

const Home = () => {
    const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
    const [theme, setTheme] = useState<MenuTheme>('light');

    const changeMode = (value: boolean) => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = (value: boolean) => {
        setTheme(value ? 'dark' : 'light');
    };

    return (
        <HomeWrapper>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo"></div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={mode}
                        theme={theme}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '5px 10px 0' }}>
                        <div
                            className="site-layout-background"
                            style={{ padding: 10, minHeight: 360 }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Footer</Footer>
                </Layout>
            </Layout>
        </HomeWrapper>
    );
};

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('文章管理', 'sub1', <AppstoreOutlined />, [
        getItem(<Link to="/articlelist">文章列表</Link>),
        getItem(<Link to="/article">写文章</Link>),
    ]),
    getItem(<Link to="/user">栏目管理</Link>, '2', <AlignRightOutlined />),
    getItem(<Link to="/user">用户管理</Link>, '3', <CalendarOutlined />),
];

export default Home;
