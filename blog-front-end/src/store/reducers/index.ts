import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import autoLoginReducer from './autoLogin';
import articleListReducer from './articleListReducer';
import deleteArticleReducer from './deleteArticleReducer';

export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    autoLogin: autoLoginReducer,
    articleList: articleListReducer,
    deleteArticle: deleteArticleReducer,
});
