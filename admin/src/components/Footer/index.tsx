/*
 * @Description: 底栏
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-24 00:11:17
 */
import React from 'react';
import { Layout } from '@arco-design/web-react';
import { FooterProps } from '@arco-design/web-react/es/Layout/interface';
import cs from '@/utils/classnames';
import styles from './style/index.module.less';

const Footer = Layout.Footer;

export default (props: FooterProps = {}) => {
  const { className, ...restProps } = props;
  return (
    <Footer className={cs(styles.footer, className)} {...restProps}>
      博客后台管理系统
    </Footer>
  );
};
