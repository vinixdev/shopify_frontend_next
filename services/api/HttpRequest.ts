import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

export default class HttpRequest {
  private baseUrl: string;
  private instance: Axios;

  constructor() {
    this.baseUrl = "https://shopify-backend-orpin.vercel.app";
    this.instance = axios.create();
  }

  public get<T, R = AxiosResponse<T>>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.get(`${this.baseUrl}${endpoint}`, config);
  }

  public post<T, B, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post(`${this.baseUrl}${endpoint}`, data, config);
  }

  public patch<T, B, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch(`${this.baseUrl}${endpoint}`, data, config);
  }

  public put<T, B, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put(`${this.baseUrl}${endpoint}`, data, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.delete(`${this.baseUrl}${endpoint}`, config);
  }
}
