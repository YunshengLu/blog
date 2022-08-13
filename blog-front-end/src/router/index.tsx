import React, { lazy, Suspense } from 'react';
import ArticleManage from '@/pages/Home/ArticleManage';
import UserManage from '@/pages/Home/UserManage';
import Login from '@/pages/Login';
import Error from '@/pages/Error';
import { Router } from 'oh-router';
import { LoginCheckMiddleware } from './middlewares/loginCheck';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import ArticleList from '@/pages/Home/ArticleList';
import { FetchUserMiddleware } from './middlewares/fetchUser';
// const Home = lazy(() => import ('@/pages/Home'))

export const router = new Router({
    middlewares: [
        new LoginCheckMiddleware(), 
        new FetchUserMiddleware()
    ],
    routes: [
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/home',
            redirect: '/articlelist',
        },
        {
            path: '/',
            redirect: '/articlelist',
            element: <Home />,
            children: [
                {
                    path: '/user',
                    element: <UserManage />,
                },
                {
                    path: '/article',
                    element: <ArticleManage />,
                },
                {
                    path: '/articlelist',
                    element: <ArticleList />,
                },
            ],
        },
        {
            path: '*',
            element: <Error />,
        },
    ],
});
