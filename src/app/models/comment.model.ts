import { TagsModel } from "./tags.model";
import { JsonMapper } from './../modules/mapper/json.mapper';
import { BaseModel } from './base.model';
import { UtilHelper } from '../helpers/util.helper';
import { ValidateModel } from './validate.model';
import { Json } from '../modules';

export class CommentModel extends BaseModel {
  @Json('name_fb')
  public name_fb: string = undefined;

  @Json('detail')
  public detail: string = undefined;
  @Json('articles_id')
  public articles_id: string = undefined;


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
   * @returns {CommentModel}
   */

  public static toRequest(data: CommentModel): CommentModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }

    model.name_fb = UtilHelper.setDataDefault(data.name_fb);
    model.articles_id = UtilHelper.setDataDefault(data.articles_id);

    return model;
  }

}
