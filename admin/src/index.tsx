/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-24 00:46:10
 */
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import history from './routes/history';
import PageLayout from './layout/page-layout';
import Setting from './components/Settings';
import { GlobalContext } from './context';
import './style/index.less';
import './mock';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import store from './store';

function Index() {
  const localeName = localStorage.getItem('arco-lang') || 'zh-CN';

  if (!localStorage.getItem('arco-lang')) {
    localStorage.setItem('arco-lang', localeName);
  }

  const [locale, setLocale] = useState();

  async function fetchLocale(ln?: string) {
    const locale = (await import(`./locale/${ln || localeName}`)).default;
    setLocale(locale);
  }

  function getArcoLocale() {
    switch (localeName) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo() {
    axios.get('/api/user/userInfo').then((res) => {
      store.dispatch({
        type: 'update-userInfo',
        data: { userInfo: res.data },
      });
    });
  }

  useEffect(() => {
    fetchLocale();
  }, []);

  useEffect(() => {
    if (checkLogin()) {
      // fetchUserInfo();
    } else {
      history.push('/admin/login');
    }
  }, []);

  const contextValue = {
    locale,
  };

  return locale ? (
    <Router history={history}>
      <ConfigProvider locale={getArcoLocale()}>
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/admin/login" component={Login} />
              <Route path="/" component={PageLayout} />
            </Switch>
            <Setting />
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </Router>
  ) : null;
}

ReactDOM.render(<Index />, document.getElementById('root'));
