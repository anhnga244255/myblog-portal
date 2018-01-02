import { TagsModel } from "./tags.model";
import { JsonMapper } from './../modules/mapper/json.mapper';
import { BaseModel } from './base.model';
import { UtilHelper } from '../helpers/util.helper';
import { ValidateModel } from './validate.model';
import { Json } from '../modules';

export class CategoryModel extends BaseModel {
  @Json('name')
  public name: string = undefined;


  @Json({ name: "article", clazz:CategoryModel, omitEmpty: true })
  public article: CategoryModel = undefined;

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

    return this.getRules();
  }

  /**
   *
   * @param data
   * @returns {CategoryModel}
   */

  public static toRequest(data: CategoryModel): CategoryModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }

    model.name = UtilHelper.setDataDefault(data.name);

    return model;
  }

}
