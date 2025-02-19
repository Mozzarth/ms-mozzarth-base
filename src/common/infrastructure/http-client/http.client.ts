import { HttpException, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export type Options<D = any> = { data?: D; params?: Record<string, any>; headers?: Record<string, any> };

export abstract class HttpClient {
  protected logger: Logger;

  constructor(
    protected readonly httpService: HttpService,
    private readonly config: AxiosRequestConfig
  ) {
    this.httpService = httpService;
    this.config = config;
  }

  public async get<T>(url: string, options?: Options): Promise<T> {
    return await this.call<T, null>('GET', url, options);
  }

  public async post<T, D>(url: string, options?: Options<D>): Promise<T> {
    return await this.call<T, D>('POST', url, options);
  }

  public async put<T, D>(url: string, options?: Options<D>): Promise<T> {
    return await this.call<T, D>('PUT', url, options);
  }

  public async patch<T = any, D = any>(url: string, options?: Options<D>): Promise<T> {
    return await this.call<T, D>('patch', url, options);
  }

  public async delete<T = any, D = any>(url: string, options?: Options<D>): Promise<T> {
    return await this.call<T, D>('delete', url, options);
  }

  private async call<T, D>(method: Method, url: string, options?: AxiosRequestConfig<D>): Promise<T> {
    this.config.headers = {
      ...options?.headers,
      ...this.config?.headers,
      'X-Application-ID': process.env.x_application_id ?? '' // Identificador unico de ms injectado en el deployment
    };
    try {
      const response: AxiosResponse<T, D> = await lastValueFrom(
        this.httpService.request({
          method,
          url,
          ...options,
          ...this.config
        })
      );
      return response.data;
    } catch (e) {
      if (e.response) {
        this.logger.error(`status: ${e.response?.status} - payload: ${JSON.stringify(e.response?.data)}`);
        throw new HttpException(e.response.data, e.response.status);
      } else {
        this.logger.error(`code: ${e.code} - url: ${e.config?.url} - message: ${e.message}`);
        throw new HttpException(e.message, 500);
      }
    }
  }
}
