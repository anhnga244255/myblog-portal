import { JsonMapper } from './../modules';
import { TransferHttp } from './../modules/transfer-http/transfer-http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { BaseService } from '../services';
import { TokenModel } from '../models';
import { REST_API } from '../modules/constants';
import { UserModel, StateModel } from '../models';

@Injectable()
export class AuthService extends BaseService {

  constructor(protected _http: TransferHttp) {
    super(_http);
  }

  /**
   * Login
   */

  public login(data): Promise<TokenModel> {
    let obj = UserModel.toLoginResquest(data);
    return this.makeHttpPost(`${this.apiUrl}/` + REST_API.SITE.LOGIN, obj)
      .then((res) => {
        return JsonMapper.deserialize(TokenModel, res);
      });
  }

  /**
   * Register
   */

  public register(data): Promise<TokenModel> {
    let obj = UserModel.toRegisterResquest(data);

    return this.makeHttpPost(`${this.apiUrl}/` + REST_API.SITE.REGISTER, obj)
      .then((res) => {
        return JsonMapper.deserialize(TokenModel, res);
      });
  }

  /**
   * forgot password
   */

  public forgotPassword(data): Promise<StateModel> {

    let obj = UserModel.toForgotPasswordResquest(data);

    return this.makeHttpPost(`${this.apiUrl}/` + REST_API.SITE.FORGOT_PASSWORD, obj);
  }


  /**
   * Logout
   */
  public logout() {
    return this.makeHttpPost(`${this.apiUrl}/` + REST_API.SITE.LOGOUT);
  }
}
