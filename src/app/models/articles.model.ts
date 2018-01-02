import { Title } from "@angular/platform-browser";
import { TagsModel } from "./tags.model";
import { JsonMapper } from './../modules/mapper/json.mapper';
import { BaseModel } from './base.model';
import { UtilHelper } from '../helpers/util.helper';
import {
  IMAGE_DEFAULT_PATH,
  IMAGE_EXTENSION,
  INPUT_MAXLENGTH,
  MAX_SIZE_UPLOAD,
  MAX_TITLE
} from '../modules/constants';
import { ValidateModel } from './validate.model';
import { Json } from '../modules';

export class ArticlesModel extends BaseModel {
  @Json('title')
  public title: string = undefined;

  @Json('date')
  public date: string = undefined;

  @Json('categoryId')
  public categoryId: string = undefined;

  @Json('auth')
  public auth: string = undefined;

  @Json('source')
  public source: string = undefined;


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

    this.addRule('firstName', 'required', true, this._t('First name can not be blank.'));
    this.addRule('firstName', 'maxLength', INPUT_MAXLENGTH, this._t(`Maximum {0} characters.`, INPUT_MAXLENGTH));

    this.addRule('lastName', 'required', true, this._t('Last name can not be blank.'));
    this.addRule('lastName', 'maxLength', INPUT_MAXLENGTH, this._t(`Maximum {0} characters.`, INPUT_MAXLENGTH));

    this.addRule('phone', 'number', true, this._t('Phone number must be a number.'));
    this.addRule('phone', 'maxLength', INPUT_MAXLENGTH, this._t(`Maximum {0} characters.`, INPUT_MAXLENGTH));

    this.addRule('email', 'required', true, this._t('Email can not be blank.'));
    this.addRule('email', 'formatEmail', true, this._t('Invalid email address.'));
    this.addRule('email', 'maxLength', INPUT_MAXLENGTH, this._t(`Maximum {0} characters.`, INPUT_MAXLENGTH));

    this.addRule('oldPassword', 'required', true, this._t('Old password can not be blank.'));
    this.addRule('newPassword', 'required', true, this._t('New password can not be blank.'));
    this.addRule('password', 'required', true, this._t('Password can not be blank.'));
    this.addRule('password', 'alphabetsAndNumbers', true, this._t('Password must be at least 6 characters including both alphabets and numbers.'));
    this.addRule('newPassword', 'alphabetsAndNumbers', true, this._t('Password must be at least 6 characters including both alphabets and numbers.'));
    this.addRule('passwordAgain', 'equalTo', '#password', this._t('Password again does not match.'));
    this.addRule('roleId', 'required', true, this._t('Account type can not be blank.'));
    this.addRule('avatarUrl', 'required', true, this._t('Image can not be blank.'));
    this.addRule('avatarUrl', 'extension', IMAGE_EXTENSION, this._t('Only allow file *.png , *.jpg.'));
    this.addRule('avatarUrl', 'maxSizeUpload', MAX_SIZE_UPLOAD, this._t(`File upload too large. Only allow {0}MB.`, MAX_SIZE_UPLOAD));

    this.addRule('country', 'required', true, this._t('Country can not be blank.'));
    this.addRule('state', 'required', true, this._t('State can not be blank.'));
    this.addRule('province', 'required', true, this._t('Province can not be blank.'));
    this.addRule('parentId', 'required', true, this._t('Parent can not be blank.'));

    return this.getRules();
  }
  /**
   *
   * @param data
   * @returns {ArticlesModel}
   */
  public static toProfileModel(data: ArticlesModel): ArticlesModel {
    let model: any = {};

    model.id = UtilHelper.setDataDefault(data.id);
    model.auth = UtilHelper.setDataDefault(data.auth);
    model.categoryId = UtilHelper.setDataDefault(data.categoryId);
    model.title = UtilHelper.setDataDefault(data.title);
    model.date = UtilHelper.setDataDefault(data.date);
    model.source = UtilHelper.setDataDefault(data.source);
  return model;
  }

  /**
   *
   * @param data
   * @returns {ArticlesModel}
   */

  public static toRequest(data: ArticlesModel): ArticlesModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }

    model.auth = UtilHelper.setDataDefault(data.auth);
    model.categoryId = UtilHelper.setDataDefault(data.categoryId);
    model.date = UtilHelper.setDataDefault(data.date);
    model.title = UtilHelper.setDataDefault(data.title);
    model.source = UtilHelper.setDataDefault(data.source);

    return model;
  }

}
