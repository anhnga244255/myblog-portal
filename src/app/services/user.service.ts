import { JsonMapper } from './../modules/mapper/json.mapper';
import { StateModel, PaginationModel, UserModel, TokenModel } from './../models';
import { UtilHelper } from './../helpers/util.helper';
import { TransferHttp } from './../modules/transfer-http/transfer-http';
import { BaseService } from './../services/base.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import { REST_API } from '../modules/constants';

@Injectable()
export class UserService extends BaseService {
  constructor(public http: TransferHttp) {
    super(http);
  }


  /**
   * Logout Api
   */
  public logout(): Promise<string> {
    return this.makeHttpGet(`${this.apiUrl}/` + REST_API.SITE.LOGOUT);
  }
  /**
   * Get Profile
   */
  public profile(): Promise<UserModel> {
    return this.makeHttpGet(`${this.apiUrl}/` + REST_API.ME.PROFILE);
  }


  /**
   * Get list user
   * @returns {Promise<T>|Promise<U>}
   */
  public findAll(paging: boolean = true, filter: any = {}): Promise<PaginationModel> {

    if (!paging) {
      filter.offset = '';
      filter.limit = '';
    }

    let queryString = UtilHelper.parseFilterToString(filter);
    return this.makeHttpGet(`${this.apiUrl}/` + REST_API.USER.LIST + '?' + queryString)
      .then((res) => {

        res.data = JsonMapper.deserialize(UserModel, res.data);
        return res;
      });
  }

  /**
   * Get user detail
   * @returns {Promise<T>|Promise<U>}
   */
  public findById(id, filter: any = {}): Promise<UserModel> {
    let queryString = UtilHelper.parseFilterToString(filter);

    return this.makeHttpGet(`${this.apiUrl}/` + REST_API.USER.DETAIL + '/' + id)
      .then((res) => {
        return JsonMapper.deserialize(UserModel, res);
      });
  }

  /**
   * Get profile
   * @returns {Promise<TResult>}
   */
  public getProfile(): Promise<UserModel> {

    return this.makeHttpGet(`${this.apiUrl}/` + REST_API.ME.PROFILE)
      .then((res) => {
        return JsonMapper.deserialize(UserModel, res);
      });
  }

  /**
   * update user
   * @returns {Promise<T>|Promise<U>}
   */
  public updateProfile(data: UserModel): Promise<StateModel> {
    let obj = UserModel.toUpdateProfileResquest(data);

    return this.makeHttpPut(`${this.apiUrl}/` + REST_API.ME.PROFILE, obj);
  }

  /**
   * update user
   * @returns {Promise<T>|Promise<U>}
   */
  public changePassword(data: UserModel): Promise<TokenModel> {
    let obj = UserModel.toChangePasswordResquest(data);

    return this.makeHttpPut(`${this.apiUrl}/` + REST_API.ME.CHANGE_PASSWORD, obj)
      .then((res) => {
        return JsonMapper.deserialize(TokenModel, res);
      });
  }


  /**
   * create user
   * @returns {Promise<T>|Promise<U>}
   */
  public create(data: UserModel): Promise<StateModel> {
    let obj = UserModel.toRequest(data);

    return this.makeHttpPost(`${this.apiUrl}/` + REST_API.USER.CREATE, obj);
  }

  /**
   * edit user
   * @returns {Promise<T>|Promise<U>}
   */
  public update(data: UserModel): Promise<StateModel> {
    let obj = UserModel.toRequest(data);

    return this.makeHttpPut(`${this.apiUrl}/` + REST_API.USER.UPDATE + '/' + data.id, obj);
  }

  public updateAvatar(data: UserModel): Promise<StateModel> {
    let obj = UserModel.toUpdateAvatar(data);

    return this.makeHttpPut(`${this.apiUrl}/` + REST_API.USER.UPDATE + '/' + data.id, obj);
  }

  /**
   * delete user
   * @returns {Promise<T>|Promise<U>}
   */
  public delete(id: string): Promise<StateModel> {
    return this.makeHttpDelete(`${this.apiUrl}/` + REST_API.USER.DELETE + '/' + id);
  }
}
