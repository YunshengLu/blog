import { postAutoLoginRequest } from '@/api/request'
import store from '@/store'
import { getToken } from '@/utils/token'
import { Middleware, MiddlewareContext } from 'oh-router'
import { router } from '..'

export class FetchUserMiddleware extends Middleware {
  async handler(
    ctx: MiddlewareContext<{}>,
    next: () => Promise<any>
  ): Promise<void> {
    const token = getToken()
    if (token && !store.getState().autoLogin) {
      await postAutoLoginRequest()
      router.rematch()
    } else {
      next()
    }
  }
}

