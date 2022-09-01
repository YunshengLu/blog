/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 23:39:38
 * @LastEditTime: 2022-08-24 00:14:08
 */
import { createStore, compose, applyMiddleware  } from 'redux';
import reducers from './reducers';
import thunk, { ThunkMiddleware } from "redux-thunk";

const composeEnhancers = 
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, 
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware)));
// Infer the `RootState` and `AppDispatch` types from the store itself

export default store;