/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-09-01 03:51:50
 */
import React from 'react';
import {
    IconList,
    IconGift,
    IconStorage,
    IconTag,
    IconHeart,
    IconUser,
    IconMessage,
    IconSettings,
    IconHome,
    IconHeartFill,
    IconNav,
    IconBook,
} from '@arco-design/web-react/icon';

export const defaultRoute = 'articles';

export const routes = [
    // {
    //     name: 'menu.welcome',
    //     key: 'welcome',
    //     icon: <IconGift />,
    //     componentPath: 'welcome',
    // },
    // {
    //   name: 'menu.list',
    //   key: 'list',
    //   icon: <IconList />,
    //   children: [
    //     {
    //       name: 'menu.list.searchTable',
    //       key: 'list/search-table',
    //       componentPath: 'search-table',
    //     },
    //   ],
    // },
    // 文章管理
    {
        name: '文章管理',
        key: 'articles',
        icon: <IconBook />,
        componentPath: 'articles',
    },
    // 添加文章
    {
        name: '添加文章',
        key: 'articles/edit',
        icon: <IconBook />,
        componentPath: 'articles/edit',
        hide: true,
    },
    // 分类管理页
    {
        name: 'menu.categories',
        key: 'categories',
        icon: <IconStorage />,
        componentPath: 'categories',
    },
    // 标签管理页
    {
        name: '标签管理',
        key: 'tags',
        icon: <IconTag />,
        componentPath: 'tags',
    },
    // 关于管理页
    {
        name: '关于管理',
        key: 'about',
        icon: <IconHeart />,
        componentPath: 'about',
    },
    // 用户管理
    {
        name: '用户管理',
        key: 'user',
        icon: <IconUser />,
        componentPath: 'user',
    },
    // 评论管理
    {
        name: '评论管理',
        key: 'comment',
        icon: <IconMessage />,
        componentPath: 'comment',
    },
    {
        name: '网页配置',
        key: 'site',
        icon: <IconSettings />,
        children: [
            {
                name: '首页配置',
                key: 'home',
                icon: <IconHome />,
                componentPath: 'site/home',
            },
            {
                name: 'Header/Footer配置',
                key: 'hf',
                icon: <IconHeartFill />,
                componentPath: 'site/headerFooter',
            },
            {
                name: '侧栏配置',
                key: 'right',
                icon: <IconNav />,
                componentPath: 'site/right',
            },
        ],
    },
];
