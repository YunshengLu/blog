/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-25 00:18:49
 */
import { Form, Input, Button, Space, Message } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';
import styles from './style/index.module.less';
import history from '@/routes/history';
import useLocale from '@/utils/useLocale';
import { login as adminLogin } from '@/api/request/login';
import { useDispatch } from 'react-redux';
import * as ActionTypes from './store/actionTypes';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const locale = useLocale();
  const dispatch = useDispatch();

  function afterLoginSuccess(params) {
    // 记录登录状态
    localStorage.setItem('token', params.token);
    dispatch({
      type: ActionTypes.LOGIN,
      data: params
    })
    // 跳转首页
    window.location.href = history.createHref({
      pathname: '/',
    });
  }

  async function login(params) {
    setErrorMessage('');
    setLoading(true);
    try {
      const res: any = await adminLogin(params);
      // console.log(res);
      const { code, data, msg } = res;
      if (data) {
        if (code === 0) {
          afterLoginSuccess(data);
        }
      } else {
        setErrorMessage(msg);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    }

    // .post('/api/v1/admin/login', params)
    // .then((res) => {
    //   const { code, data, msg } = res.data;
    //   if (data) {
    //     if (code === 0) {
    //       afterLoginSuccess(params)
    //     }
    //   } else {
    //     setErrorMessage(msg);
    //   }
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
  }

  async function onSubmitClick() {
    // formRef.current.validate().then((values) => {
    //   // console.log(values);
    //   login(values);
    // });
    try {
      await form.validate();
      const values = await form.getFields();
      // console.log(values);
      login(values);
    } catch (error) {
      Message.error('校验失败');
    }
  }

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>博客后台管理系统</div>
      <div className={styles['login-form-sub-title']}>登录博客后台管理系统</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        form={form}
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
      >
        <Form.Item
          field="userName"
          rules={[
            { required: true, message: locale['login.p_userName'] },
            {
              match: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
              message: locale['login.p_userName_pattern'],
            },
          ]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={locale['login.p_userName']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[
            { required: true, message: locale['login.p_password'] },
            {
              match: /^[A-Za-z0-9_]{5,20}$/,
              message: locale['login.p_password_pattern'],
            },
          ]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={locale['login.p_password']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {locale['login.login']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
