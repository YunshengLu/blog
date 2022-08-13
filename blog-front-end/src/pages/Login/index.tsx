import React, { useState, useEffect, useRef } from 'react';
import LoginBG from '@/components/LoginBG';
import { LoginWrapper } from './style';
import { Button, Checkbox, Form, Input } from 'antd';
// import { Article } from '@/models/Article';
import { connect } from 'react-redux';
import { postAutoLoginAction, postLoginAction } from '@/store/actionCreators';
import { Dispatch } from 'redux';
import { rootState } from '@/store';
import { Link } from 'oh-router-react';
import { router } from '@/router/index';
import { getToken } from '@/utils/token';

interface ArticleItemProps {
    // Article: Article;
    login: Array<string>;
    postLoginActionDispatch: (data: string) => void;
    postAutoLoginActionDispatch: () => void;
}

const Login:React.FC<ArticleItemProps> = (props) =>{

    const {
        login,
    } = props;

    const {
        postLoginActionDispatch,
        postAutoLoginActionDispatch,
    } = props;

    const onFinish = async(values: any) => {
        console.log('Success:', values);
        await postLoginActionDispatch(values);
        // await postAutoLoginActionDispatch();
        // router.navigate("/home")

        let token = getToken();
        if(token) {
            await postAutoLoginActionDispatch();
            router.navigate("/articlelist")
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        let token = getToken();
        if(token) {
            postAutoLoginActionDispatch();
            router.navigate("/home")
        }
    },[login])
    console.log(login,'###########登录界面数据login');

    return (
        <LoginWrapper>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="container"
            >
                <div className="tit">登录</div>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input placeholder="Username" autoFocus />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password 
                        autoComplete="off" 
                        placeholder="Password" />
                </Form.Item>

                <Form.Item className="btn">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                <span>
                    没有账号？<Link to="/register">去注册</Link>
                </span>
            </Form>
            <LoginBG />
        </LoginWrapper>
    );
};

const mapStateToProps = (state: rootState) => ({
    login: state.login,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    postLoginActionDispatch(data: string) {
        dispatch(postLoginAction(data))
    },
    postAutoLoginActionDispatch() {
        dispatch(postAutoLoginAction())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Login);
