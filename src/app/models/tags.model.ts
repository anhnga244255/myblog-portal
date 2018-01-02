import { BaseModel } from "./base.model";
import { UtilHelper } from "../helpers";
import { Json } from '../modules';
import { ValidateModel } from './validate.model';
import {
  IMAGE_DEFAULT_PATH,
  IMAGE_EXTENSION,
  INPUT_MAXLENGTH,
  MAX_SIZE_UPLOAD,
  MAX_TITLE
} from '../modules/constants';

export class TagsModel extends BaseModel {
  @Json('name')
  public name: string = undefined;

  @Json('userId')
  public userId: string = undefined;

  @Json('tagId')
  public tagId: string = undefined;

  @Json('desc')
  public desc: string = undefined;

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

    this.addRule('name', 'required', true, this._t('Name can not be blank.'));
    this.addRule('name', 'maxLength', INPUT_MAXLENGTH, this._t(`Maximum {0} characters.`, INPUT_MAXLENGTH));

    this.addRule('desc', 'required', true, this._t('Description can not be blank.'));
    this.addRule('desc', 'maxLength', INPUT_MAXLENGTH, this._t(`Maximum {0} characters.`, INPUT_MAXLENGTH));

    this.addRule('userId', 'required', true, this._t('User can not be blank.'));

    return this.getRules();
  }
  public static toRequest(data: TagsModel): TagsModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }

    model.name = UtilHelper.setDataDefault(data.name);
    model.desc = UtilHelper.setDataDefault(data.desc);
    model.userId = UtilHelper.setDataDefault(data.userId);
    model.tagId = UtilHelper.setDataDefault(data.tagId);

    return model;
  }
}
