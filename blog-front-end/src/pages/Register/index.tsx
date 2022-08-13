import React, { useState, useEffect, useRef } from 'react';
import LoginBG from '@/components/LoginBG';
import { LoginWrapper } from './style';
import { Button, Form, Input, message } from 'antd';
// import { Article } from '@/models/Article';
import { connect } from 'react-redux';
import { postRegisterAction } from '@/store/actionCreators';
import { Dispatch } from 'redux';
import { rootState } from '@/store';
import { Link } from 'oh-router-react';

interface ArticleItemProps {
    // Article: Article;
    register: any;
    postRegisterActionDispatch: (data: string) => void;
}

const Register: React.FC<ArticleItemProps> = props => {
    const { register } = props;

    const { postRegisterActionDispatch } = props;

    const onFinish = (values: any) => {
        console.log('Success:', values);
        const userInfo:any = {}
        for (const key in values) {
            if(key == 'username') {
                userInfo[key] = values[key]
            } else if(key == 'password') {
                userInfo[key] = values[key]
            }
        }
        postRegisterActionDispatch(userInfo);
        if(register.data == 'repeat'){
            error()
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const error = () => {
        message.error('用户已存在!');
    };

    useEffect(() => {
        if(register.data == 'repeat'){
            error()
        }
    },[register])

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
                <div className="tit">注册</div>
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
                    <Input.Password autoComplete="off" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The two passwords that you entered do not match!')
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password autoComplete="off" placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item className="btn">
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
                <span>
                    已有账号？<Link to="/login">去登录</Link>
                </span>
            </Form>
            <LoginBG />
        </LoginWrapper>
    );
};

const mapStateToProps = (state: rootState) => ({
    register: state.register,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    postRegisterActionDispatch(data: string) {
        dispatch(postRegisterAction(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
