/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-09-01 03:34:39
 */
import Mock from 'mockjs';

import './user';
import './message-box';
import '@/pages/search-table/mock';
import '@/pages/categories/mock';
import '@/pages/tags/mock';
import '@/pages/about/mock';
import '@/pages/user/mock';
import '@/pages/comment/mock';
import '@/pages/site/home/mock';
import '@/pages/site/headerFooter/mock';
import '@/pages/site/right/mock';
import '@/pages/articles/mock';

Mock.setup({
  timeout: '200-600',
});
