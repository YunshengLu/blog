import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import autoLoginReducer from './autoLogin';
import acticleListReducer from './acticleListReducer';

export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    autoLogin: autoLoginReducer,
    acticleList: acticleListReducer,
});
