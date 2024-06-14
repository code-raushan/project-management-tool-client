import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { LocalStorage } from "./localStorage";

class ApiClient {
  constructor() {
  }

  _getClient(baseURL?: string): AxiosInstance {
    const apiClient = axios.create({
      baseURL: baseURL || "http://localhost:4000/api/v1"
    });

    apiClient.interceptors.request.use(
      async (config) => {
        const user = LocalStorage.get("user");
        const token = user.token;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      err => {
        return Promise.reject(err);
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
