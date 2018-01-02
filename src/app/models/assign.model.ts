import { BaseModel } from "./base.model";
import { UtilHelper } from "../helpers";
import { Json } from '../modules';
import { ValidateModel } from './validate.model';

export class AssignModel extends BaseModel {
  @Json('country')
  public country: string = undefined;

  @Json('state')
  public state: string = undefined;

  @Json('province')
  public province: string = undefined;

  @Json('tags')
  public tags: string[];

  @Json('users')
  public users: string[];

  @Json('presentationId')
  public presentationId: string;

  constructor() {
    super();
    this.validateRules = new ValidateModel();
    this.initValidateRules();

  }

  /**
   * init validate rule
   * @returns {ValidateModel}
   */
  public initValidateRules(): ValidateModel {
    return this.getRules();
  }
  public static toRequest(data: AssignModel): AssignModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }

    model.country = UtilHelper.setDataDefault(data.country);
    model.state = UtilHelper.setDataDefault(data.state);
    model.province = UtilHelper.setDataDefault(data.province);
    if(data.tags && data.tags.length > 0){
      model.tags = data.tags;
    }
    if(data.users && data.users.length > 0){
      model.users = data.users;
    }
    return model;
  }
}
