import { Middleware, MiddlewareContext } from 'oh-router';
import { router } from '..';
import { getToken } from '@/utils/token';
import store from '@/store';
import { postAutoLoginAction } from '@/store/actionCreators';
import { postAutoLoginRequest } from '@/api/request';

/**
 * 判断用户是否登录中间件
 */
export class LoginCheckMiddleware extends Middleware {
    async handler(ctx: MiddlewareContext<{}>, next: () => Promise<any>): Promise<void> {
        // 判断用户有没有登录,登录界面不需要执行
        const token = getToken();

        // 如果进入的是登录或注册页
        if (ctx.to.pathname === '/login' || ctx.to.pathname === '/register') {
            // 是否已登录
            if (token) {
                // 重定向到首页
                router.navigate('/');
            } else {
                // 否则允许进入登录页
                next();
            }
        }

        if (token) {
            next();
        } else if (ctx.to.pathname === '/register') {
            next();
        } else {
            router.navigate('/login');
        }
    }

    // 下面代码没判断用户是否已登录，遂弃用
    // 重写
    // 如果用户访问的页面不是登录界面才执行上面的代码，否则直接跳过上面那个中间件LoginCheckMiddleware
    //   register({to}: MiddlewareContext<{}>) {
    //     return to.pathname !== "/login"
    //   }
}

// export class LoginCheckMiddleware extends Middleware {
//     async handler(ctx: MiddlewareContext<{}>, next: () => Promise<any>): Promise<void> {
//         // 判断用户有没有登录,登录界面不需要执行
//         store.dispatch(postAutoLoginAction())
//         const token = getToken();
//         // console.log(token,'~~~~~~~~~~~~~~~');
//         let autoToken = '';
//         let code = store.getState().autoLogin.code;
//         if(store.getState().autoLogin.data){
//             autoToken = store.getState().autoLogin.data.token;
//         }else{
//             router.navigate('/login');
//         }
//         console.log(code,'!!!!!!!!!!!!!!');

//         // 如果进入的是登录或注册页
//         if (ctx.to.pathname === '/login' || ctx.to.pathname === '/register') {
//             // 是否已登录
//             if (token === autoToken || code == 1) {
//                 // 重定向到首页
//                 router.navigate('/');
//             } else {
//                 // 否则允许进入登录页
//                 next();
//             }
//         }

//         if (token === autoToken) {
//             next();
//         } else if (ctx.to.pathname === '/register') {
//             next();
//         } else {
//             router.navigate('/login');
//         }
//     }
// }


// export class LoginCheckMiddleware extends Middleware {
//     async handler(ctx: MiddlewareContext<{}>, next: () => Promise<any>): Promise<void> {
//         // 判断用户有没有登录,登录界面不需要执行
//         const token = getToken();

//         // 如果进入的是登录或注册页
//         if (ctx.to.pathname === '/login' || ctx.to.pathname === '/register') {
//             // 是否已登录
//             if (token) {
//                 postAutoLoginRequest().then((data: any) => {
//                     console.log(data,'1111111111111111');
//                     if(!data.code){
//                         console.log(data.code);
//                         router.navigate('/login');
//                     }else{
//                         next()
//                     }
//                 })
//                 // 重定向到首页
//                 // router.navigate('/');
//             } else {
//                 // 否则允许进入登录页
//                 next();
//             }
//         }

//         if (token) {
//             postAutoLoginRequest().then((data: any) => {
//                 console.log(data,'1111111111111111');
//                 if(!data.code){
//                     console.log(data.code);
//                     router.navigate('/login');
//                 }else{
//                     next()
//                 }
//             })
//             next();
//         } else if (ctx.to.pathname === '/register') {
//             next();
//         } else {
//             router.navigate('/login');
//         }
//     }

// }