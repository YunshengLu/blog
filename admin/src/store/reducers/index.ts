/*
 * @Description:
 * @version:
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-09-01 03:26:03
 */
import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import searchTable, {
    SearchTableState,
} from '@/pages/search-table/store/reducer';
import categories, { CategoriesState } from '@/pages/categories/store/reducer';
import tags, { tagsState } from '@/pages/tags/store/reducer';
import login, { UserLoginState } from '@/pages/login/store/reducer';
import user, { userState } from '@/pages/user/store/reducer';
import comment, { commentState } from '@/pages/comment/store/reducer';
import recommend, { RecommendState } from '@/pages/site/right/components/store/reducer';
import articles, { ArticlesState } from '@/pages/articles/store/reducer';

export interface ReducerState {
    global: GlobalState;
    searchTable: SearchTableState;
    categories: CategoriesState;
    login: UserLoginState;
    tags: tagsState;
    user: userState;
    comment: commentState;
    recommend: RecommendState;
    articles: ArticlesState;
}

export default combineReducers({
    global,
    searchTable,
    login,
    categories,
    tags,
    user,
    comment,
    recommend,
    articles,
});
