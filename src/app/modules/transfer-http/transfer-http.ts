import { ConfigService } from '@ngx-config/core';
import { ThemeSpinner } from './../../themes/services/theme_spinner/theme_spinner.service';
import { HTTP_CONNNECTION_TIMEOUT } from './../constants';
import { Injectable } from '@angular/core';
import {
  ConnectionBackend, Http, Request, RequestOptions,
  RequestOptionsArgs, Response
} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { TransferState } from '../transfer-state/transfer-state';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class TransferHttp {
  public isShowSpinner: boolean = true;

  constructor(private http: Http,
    public config: ConfigService,
    protected transferState: TransferState,
    private spinner: ThemeSpinner) {
  }

  /**
   * Performs a request with http method.
   * @param uri 
   * @param options 
   */
  public request(url: string | Request, options?: RequestOptionsArgs): Promise<any> {
    if (this.isShowSpinner) {
      this.spinner.show();
    }
    return this.http.request(url, options)
      .timeout(HTTP_CONNNECTION_TIMEOUT)
      .finally(() => {
        if (this.isShowSpinner) {
          this.spinner.hide();
        }
      })
      .toPromise();
  }
  /**
   * Performs a request with `get` http method.
   */
  public get(url: string, options?: RequestOptionsArgs): Promise<any> {
    if (this.isShowSpinner) {
      this.spinner.show();
    }
    return this.http.get(url, options)
      .timeout(HTTP_CONNNECTION_TIMEOUT)
      .finally(() => {
        if (this.isShowSpinner) {
          this.spinner.hide();
        }
      })
      .toPromise();
  }
  /**
   * Performs a request with `post` http method.
   */
  public post(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
    if (this.isShowSpinner) {
      this.spinner.show();
    }
    return this.http.post(url, body, options)
      .timeout(HTTP_CONNNECTION_TIMEOUT)
      .finally(() => {
        if (this.isShowSpinner) {
          this.spinner.hide();
        }
      })
      .toPromise();
  }
  /**
   * Performs a request with `put` http method.
   */
  public put(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
    if (this.isShowSpinner) {
      this.spinner.show();
    }
    return this.http.put(url, body, options)
      .timeout(HTTP_CONNNECTION_TIMEOUT)
      .finally(() => {
        if (this.isShowSpinner) {
          this.spinner.hide();
        }
      })
      .toPromise();
  }
  /**
   * Performs a request with `delete` http method.
   */
  public delete(url: string, options?: RequestOptionsArgs): Promise<any> {
    if (this.isShowSpinner) {
      this.spinner.show();
    }
    return this.http.delete(url, options)
      .timeout(HTTP_CONNNECTION_TIMEOUT)
      .finally(() => {
        if (this.isShowSpinner) {
          this.spinner.hide();
        }
      })
      .toPromise();
  }
  /**
   * Performs a request with `patch` http method.
   */
  public patch(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
    if (this.isShowSpinner) {
      this.spinner.show();
    }
    return this.http.patch(url, body.options)
      .timeout(HTTP_CONNNECTION_TIMEOUT)
      .finally(() => {
        if (this.isShowSpinner) {
          this.spinner.hide();
        }
      })
      .toPromise();
  }
  /**
   * Performs a request with `head` http method.
   */
  public head(url: string, options?: RequestOptionsArgs): Promise<any> {
    if (this.isShowSpinner) {
      this.spinner.show();
    }
    return this.http.head(url, options)
      .timeout(HTTP_CONNNECTION_TIMEOUT)
      .finally(() => {
        if (this.isShowSpinner) {
          this.spinner.hide();
        }
      })
      .toPromise();
  }
  /**
   * Performs a request with `options` http method.
   */
  public options(url: string, options?: RequestOptionsArgs): Promise<any> {
    if (this.isShowSpinner) {
      this.spinner.show();
    }
    return this.http.options(url, options)
      .timeout(HTTP_CONNNECTION_TIMEOUT)
      .finally(() => {
        if (this.isShowSpinner) {
          this.spinner.hide();
        }
      })
      .toPromise();
  }

  /**
   * Get Data From Cache
   * @param uri 
   * @param options 
   * @param callback 
   */
  private getData(uri: string | Request, options: RequestOptionsArgs, callback: (uri: string | Request, options?: RequestOptionsArgs) => Promise<Response>) {

    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + JSON.stringify(options);

    try {
      return this.resolveData(key);
    } catch (e) {
      return callback(uri, options)
        .then(res => {
          this.setCache(key, res);
          return res;
        });
    }
  }
  /**
   * Get Data From Cache
   * @param uri
   * @param body 
   * @param options 
   * @param callback 
   */
  private getPostData(uri: string | Request, body: any, options: RequestOptionsArgs, callback: (uri: string | Request, body: any, options?: RequestOptionsArgs) => Promise<Response>) {

    let url = uri;

    if (typeof uri !== 'string') {
      url = uri.url;
    }

    const key = url + JSON.stringify(body) + JSON.stringify(options);

    try {
      return this.resolveData(key);
    } catch (e) {
      return callback(uri, body, options)
        .then(res => {
          this.setCache(key, res);
          return res;
        });
    }
  }
  /**
   * Resolve data
   * @param key 
   */
  private resolveData(key: string) {
    const data = this.getFromCache(key);

    if (!data) {
      throw new Error();
    }
    return Promise.resolve(data);
  }
  /**
   * Reject Data
   * @param error 
   */
  private rejectData(error: any) {
    return Promise.reject(error);
  }
  /**
   * Set Cache
   * @param key 
   * @param data 
   */
  private setCache(key, data) {
    return this.transferState.set(key, data);
  }
  /**
   * Get Cache
   * @param key
   */
  private getFromCache(key): any {
    return this.transferState.get(key);
  }
}
