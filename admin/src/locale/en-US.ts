/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-24 01:30:38
 */
import localeSettings from './en-US/settings';
import localeMessageBox from '@/components/MessageBox/locale/en-US';
import localeSearchTable from '@/pages/search-table/locale/en-US';
import localeWelcome from '@/pages/welcome/locale/en-US';
import login from '@/pages/login/locale/en-US';

export default {
  'menu.list': 'List',
  'navbar.docs': 'Docs',
  'menu.categories': 'Categories',
  ...localeSettings,
  ...localeMessageBox,
  ...localeSearchTable,
  ...localeWelcome,
  ...login,
};
