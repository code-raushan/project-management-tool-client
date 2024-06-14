import { SuccessResponse } from "@/interfaces/api";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { LocalStorage } from "./localStorage";

class ApiClient {
  constructor() {
    this._get = this._get.bind(this)
    this._post = this._post.bind(this)
    this._patch = this._patch.bind(this)
    this._put = this._put.bind(this)
    this._delete = this._delete.bind(this)
  }

  _getClient(baseURL?: string): AxiosInstance {
    const apiClient = axios.create({
      baseURL: baseURL || "http://localhost:4000/api/v1"
    });

    apiClient.interceptors.request.use(
      async (config) => {
        const user = LocalStorage.get("user");
        const token = user?.token;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    )

    apiClient.interceptors.response.use(
      // @ts-ignore
      async (
        response: AxiosResponse<SuccessResponse, any>
      ): Promise<[SuccessResponse, undefined]> => {
        return [response.data, undefined]
      },
      (err): [undefined, string] => {
        if (err.response.data) {
          if (err?.response?.status === 401) {
            LocalStorage.clear();
            toast.error(JSON.stringify(err?.response.data.error))
            // window.location.href = '/login'
          }
          if (!err.response.data?.success) {
            if (
              err.response.data.message ||
              err.response.data.msg ||
              err.response.data.error
            ) {
              // LocalStorage.get('user') &&
              toast.error(
                // err.response.data.message ||
                err.response.data.msg || err.response.data.error
              )
            } else {
              toast.error('Something went wrong')
            }
            return [
              undefined,
              err.response.data.message || err.response.data.msg,
            ]
          }
        } else {
          console.log(err.response)
        }
        return [undefined, 'Request config error']
      }
    )

    return apiClient;
  }

  _get(
    url: string,
    config?: AxiosRequestConfig<any>,
    baseURL?: string
  ): Promise<ResponseType> {
    const get = this._getClient(baseURL).get(url, config)
    return get as unknown as Promise<ResponseType>
  }

  _post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
    baseURL?: string
  ): Promise<ResponseType> {
    const post = this._getClient(baseURL).post(url, data, config)
    return post as unknown as Promise<ResponseType>
  }

  _patch(
    url?: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
    baseURL?: string
  ): Promise<ResponseType> {
    const patchedUrl = url || ''
    const patch = this._getClient(baseURL).patch(patchedUrl, data, config)
    return patch as unknown as Promise<ResponseType>
  }

  _put(
    url: string,
    data: any,
    config?: AxiosRequestConfig<any>,
    baseURL?: string
  ): Promise<ResponseType> {
    const put = this._getClient(baseURL).put(url, data, config)
    return put as unknown as Promise<ResponseType>
  }

  _delete(
    url?: string,
    config?: AxiosRequestConfig<any>,
    baseURL?: string
  ): Promise<ResponseType> {
    if (url === undefined) {
      throw new Error('URL is required')
    }
    const del = this._getClient(baseURL).delete(url, config)
    return del as unknown as Promise<ResponseType>
  }
}

const Client = new ApiClient()
const get = Client._get
const post = Client._post
const patch = Client._patch
const put = Client._put
const del = Client._delete

export { del, get, patch, post, put };
