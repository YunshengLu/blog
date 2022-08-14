import styled from 'styled-components';
import { px2rem } from '@/assets/global-style';

export const HomeWrapper = styled.div`
    /* position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    z-index: 10;
    padding-bottom: ${px2rem(2)};
    .partition {
        position: relative;
        .tab-bar {
            margin-right: ${px2rem(56)};
        }
        .switch {
            position: absolute;
            top: 0;
            bottom: 0;
            right: ${px2rem(22)};
            line-height: ${px2rem(40)};
            font-size: ${px2rem(18)};
        }
    } */
    .ant-layout-header {
        height: 6vh;
        padding: 0 50px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 64px;
        background: #fff;
        .ant-btn {
            position: absolute;
            right: 1.5vw;
            top: 1vh;
        }
    }
    .ant-layout-sider {
        position: relative;
        min-width: 20vw;
        max-width: 20vw;
        background: #001529;
        transition: all 0.2s;
        background-color: #41414120;
    }
    .ant-layout-sider-children {
        height: 96vh;
        margin-top: 6vh;
        background-color: #fff;
    }
    .ant-layout-sider-zero-width-trigger {
        position: absolute;
        top: 0;
        right: -4vw;
        z-index: 1;
        width: 4vw;
        height: 6vh;
        color: #fff;
        font-size: 18px;
        line-height: 42px;
        text-align: center;
        background-color: #41414120;
        border-radius: 0 2px 2px 0;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    .ant-layout-sider-zero-width-trigger::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #41414120;
        transition: all 0.3s;
        content: '';
    }
    .ant-layout-footer {
        padding: 1vh 2vw;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        background: #f0f2f5;
    }
`;

export const ContentWrapper = styled.div``;
