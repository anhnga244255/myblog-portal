import { UserModel } from './user.model';
import { BaseModel } from "./base.model";
import * as moment from 'moment';
import { Json } from '../modules';

export class TokenModel extends BaseModel {
  @Json('token')
  public token: string = undefined;

  @Json('firebaseToken')
  public firebaseToken: string = undefined;

  @Json('expiredTime')
  public expiredTime: number = undefined;

  @Json('userId')
  public userId: string = undefined;

  @Json({ name: "user", clazz: UserModel, omitEmpty: true })
  public user: UserModel = undefined;
}
