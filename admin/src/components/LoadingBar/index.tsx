/*
 * @Descripttion: 进度条组件
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-09-01 22:17:05
 */
import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Progress } from '@arco-design/web-react';

/**
 * @name: 进度条组件 Progress
 * @msg: 
 * @param {*} _
 * @param {*} ref
 * @return {LoadingBar}
 */
function LoadingBar(_, ref) {
  const loadingTimer = useRef(null);

  // Progress进度条参数
  const [percent, setPercent] = useState<number>(30);
  const [hide, setHide] = useState<boolean>(true);

  function loading() {
    setHide(false);
    setPercent(30);
    loadingTimer.current = setInterval(() => {
      if (percent <= 98) {
        setPercent(percent > 80 ? percent + 1 : percent + 10);
      }
    }, 1000);
  }

  function success() {
    clearInterval(loadingTimer.current);
    setPercent(100);

    setTimeout(() => {
      setHide(true);
    }, 300);
  }

  useImperativeHandle(ref, () => ({
    loading,
    success,
  }));

  return !hide ? (
    <Progress
      percent={percent}
      showText={false}
      animation
      style={{ position: 'absolute', height: 2, top: -1, zIndex: 9999 }}
    />
  ) : null;
}

export default forwardRef(LoadingBar);
