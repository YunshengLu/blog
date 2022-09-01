/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-24 01:29:36
 */
import localeSettings from './zh-CN/settings';
import localeMessageBox from '@/components/MessageBox/locale/zh-CN';
import localeSearchTable from '@/pages/search-table/locale/zh-CN';
import localeWelcome from '@/pages/welcome/locale/zh-CN';
import login from '@/pages/login/locale/zh-CN'

export default {
  'menu.list': '列表页',
  'menu.categories': '分类管理',
  'navbar.docs': '文档中心',
  ...localeSettings,
  ...localeMessageBox,
  ...localeSearchTable,
  ...localeWelcome,
  ...login,
};
