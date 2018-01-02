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

export class CountryModel extends BaseModel {
  @Json('name')
  public name: string = undefined;

  @Json('code')
  public code: string = undefined;

  @Json('id')
  public keyword: string = undefined;

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

    return this.getRules();
  }
  public static toRequest(data: CountryModel): CountryModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }

    model.name = UtilHelper.setDataDefault(data.name);
    model.code = UtilHelper.setDataDefault(data.code);

    return model;
  }
}
