/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-29 02:42:34
 */
import defaultSettings from '@/settings.json';

const defaultTheme = localStorage.getItem('arco-theme') || 'light';

/**
 * @name: 主题切换
 * @msg: 
 * @param {*} newTheme，切换的主题
 * @return {*}
 */
function changeTheme(newTheme?: 'string') {
  if ((newTheme || defaultTheme) === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
}

// init page theme
changeTheme();

export interface GlobalState {
  theme?: string;
  settings?: typeof defaultSettings;
  collapsed?: boolean;
  userInfo?: {
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
  };
}

const initialState: GlobalState = {
  theme: defaultTheme,
  settings: defaultSettings,
  collapsed: false,
  userInfo:{
    name:'never',
    avatar:'https://th.bing.com/th/id/OIP.MtJbfO5Qq3QOdxKC44VZ5AAAAA?w=196&h=196&c=7&r=0&o=5&dpr=2&pid=1.7'
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'toggle-theme': {
      const { theme } = action.data;
      if (theme === 'light' || theme === 'dark') {
        localStorage.setItem('arco-theme', theme);
        changeTheme(theme);
      }

      return {
        ...state,
        theme,
      };
    }
    case 'update-settings': {
      const { settings } = action.data;
      return {
        ...state,
        settings,
      };
    }
    case 'toggle-Collapse': {
      return {
        ...state,
        collapsed: action.data
      }
    }
    default:
      return state;
  }
}
