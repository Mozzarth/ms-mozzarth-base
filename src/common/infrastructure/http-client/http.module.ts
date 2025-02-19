import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Module({
  imports: [HttpModule],
  exports: [HttpModule]
})
export class HttpClientModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  public onModuleInit(): any {
    const logger = new Logger('HttpClient');

    this.httpService.axiosRef.interceptors.request.use((request) => {
      const id = Math.floor(100_000 + Math.random() * 900_000);
      request['metadata'] = { ...request['metadata'], startDate: new Date(), id };
      const { url, baseURL, method, data, params } = request;
      if (url.includes('snowflakecomputing')) {
        logger.log(`request[${id}]: ${method.toUpperCase()} ${baseURL ?? ''}${url}${this.buildParams(params)}`);
      } else {
        logger.log(
          `request[${id}]: ${method.toUpperCase()} ${baseURL ?? ''}${url}${this.buildParams(params)}`,
          `payload[${id}]: ${typeof data === 'string' ? data : JSON.stringify(data)}`
        );
      }

      return request;
    });

    this.httpService.axiosRef.interceptors.response.use(
      (response: AxiosResponse) => {
        const {
          config: { url, method, baseURL, params },
          status,
          data
        } = response;
        const id = response.config['metadata']?.id;
        const duration = new Date().getTime() - response.config['metadata'].startDate.getTime();

        if (
          url.includes('snowflakecomputing') ||
          `${baseURL ?? ''}${url}`.includes('category/tree') ||
          `${baseURL ?? ''}${url}`.includes('assets/img') ||
          `${baseURL ?? ''}${url}`.includes('drive.google.com') ||
          `${baseURL ?? ''}${url}`.includes('s3.amazonaws.com')
        ) {
          logger.log(
            `response[${id}]: ${method.toUpperCase()} ${baseURL ?? ''}${url}${this.buildParams(params)} ${duration}ms - status: ${status}`
          );
        } else {
          logger.log(
            `response[${id}]: ${method.toUpperCase()} ${baseURL ?? ''}${url}${this.buildParams(params)} ${duration}ms - status: ${status}`,
            ` payload[${id}]: ${typeof data === 'string' ? data : JSON.stringify(data)}`
          );
        }

        return response;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  private buildParams(parameters: Record<string, any>): string {
    if (!parameters) return '';
    const keys = Object.keys(parameters);
    const keyMap: string[] = keys.map((key) => `${key}=${parameters[key]}`);
    return '?' + keyMap.join('&');
  }
}
