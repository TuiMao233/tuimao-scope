import _axios, { AxiosStatic } from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    get<T = any, R = AxiosResponse<T>>(
      url: string,
      params?: any,
      config?: AxiosRequestConfig
    ): Promise<R>
    delete<T = any, R = AxiosResponse<T>>(
      url: string,
      params?: any,
      config?: AxiosRequestConfig
    ): Promise<R>
    head<T = any, R = AxiosResponse<T>>(
      url: string,
      params?: any,
      config?: AxiosRequestConfig
    ): Promise<R>
    options<T = any, R = AxiosResponse<T>>(
      url: string,
      params?: any,
      config?: AxiosRequestConfig
    ): Promise<R>
  }
}

/**
 * Axios 原型 Api 调整, 不传则默认全局
 *
 * 涉及 delete, get, head, options 等方法的修改
 *
 * 主要参数调整 (url, config) -> (url, params, config)
 * @param AxiosStatic
 */
export const axiosProtoApiModify = (axios?: AxiosStatic) => {
  const origin = axios || _axios
  const dealWithOrigin = (origin: any) => {
    if (typeof origin === 'undefined') return undefined
    ;['delete', 'get', 'head', 'options'].forEach((method) => {
      origin[method] = function (url: string, params?: any, config?: any) {
        return origin.call(this, url, { params, ...config })
      }
    })
  }
  dealWithOrigin(origin)
  dealWithOrigin((origin as any).Axios)
}