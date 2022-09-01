/*
 * @Description: 底部状态栏
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-29 01:55:12
 * @LastEditTime: 2022-09-01 22:18:11
 */
import React from 'react';
import HISTORY from '@/routes/history';
import { Button, Link } from '@arco-design/web-react';
import styles from './style/index.module.less';
import {
    IconClockCircle,
    IconRefresh,
    IconSave,
    IconUndo,
} from '@arco-design/web-react/icon';
import { useSelector } from 'react-redux';
import { ReducerState } from '@/store/reducers';
import dayjs from 'dayjs';

const Save = (props) => {
    const { time, showBack, onBack, onRefresh, onSave } = props;
    const message = time ? `上次操作时间: ${dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')}` : '暂无操作';

    const goBack = () => {
        HISTORY.goBack();
    };
    const { settings, collapsed } = useSelector(
        (state: ReducerState) => state.global
    );

    const width = collapsed
        ? `calc(100% - 48px)`
        : `calc(100% - ${settings.menuWidth}px)`;

    return (
        <div className={styles['card']} style={{ width }}>
            <div className={styles['box']}>
                <Link status="warning" icon={<IconClockCircle />}>
                    {message}
                </Link>
                {showBack && (
                    <Button
                        className={styles['box-btn']}
                        onClick={onBack || goBack}
                        status="success"
                        icon={<IconUndo />}
                    >
                        返回
                    </Button>
                )}
                {onRefresh && (
                    <Button
                        className={styles['box-btn']}
                        onClick={onRefresh}
                        status="warning"
                        icon={<IconRefresh />}
                    >
                        刷新
                    </Button>
                )}
                {onSave && (
                    <Button
                        className={styles['box-btn']}
                        onClick={onSave}
                        status="danger"
                        icon={<IconSave />}
                    >
                        保存
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Save;
