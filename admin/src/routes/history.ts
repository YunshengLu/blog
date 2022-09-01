/*
 * @Description: 
 * @version: 
 * @Author: LuyunSheng
 * @Date: 2022-08-23 21:45:32
 * @LastEditTime: 2022-08-24 00:16:44
 */
/**
 * history.push(path, [state])
 * history.replace(path, [state])
 * history.go(n)
 * history.goBack()
 * history.goForward()
 *
 * history.listen(func) // listen for changes to the current location
 *
 */
import { createBrowserHistory } from 'history';

const HISTORY = createBrowserHistory({
  basename: '/',
});

export default HISTORY;
