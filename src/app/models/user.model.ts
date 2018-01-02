import { TagsModel } from "./tags.model";
import { JsonMapper } from './../modules/mapper/json.mapper';
import { BaseModel } from './base.model';
import { UtilHelper } from '../helpers/util.helper';
import { RoleModel } from './role.model';
import {
  IMAGE_DEFAULT_PATH,
  IMAGE_EXTENSION,
  INPUT_MAXLENGTH,
  MAX_SIZE_UPLOAD,
  MAX_TITLE
} from '../modules/constants';
import { ValidateModel } from './validate.model';
import { Json } from '../modules';

export class UserModel extends BaseModel {
  @Json('email')
  public email: string = undefined;

  @Json('oldPassword')
  public oldPassword: string = undefined;

  @Json('newPassword')
  public newPassword: string = undefined;

  @Json('password')
  public password: string = undefined;

  @Json('passwordAgain')
  public passwordAgain: string = undefined;

  @Json('firstName')
  public firstName: string = undefined;

  @Json('lastName')
  public lastName: string = undefined;

  @Json('name')
  public name: string = undefined;

  @Json('roleId')
  public roleId: string = undefined;

  @Json('phone')
  public phone: string = undefined;

  @Json('country')
  public country: string = undefined;

  @Json('state')
  public state: string = undefined;

  @Json('province')
  public province: string = undefined;

  @Json('parentId')
  public parentId: string = undefined;

  @Json('tags')
  public tags: string[] = [];

  @Json('avatarUrl')
  public avatarUrl: string = undefined;

  @Json({ name: "role", clazz: RoleModel, omitEmpty: true })
  public role: RoleModel = undefined;


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
   * @returns {UserModel}
   */
  public static toProfileModel(data: UserModel): UserModel {
    let model: any = {};

    model.id = UtilHelper.setDataDefault(data.id);
    model.roleId = UtilHelper.setDataDefault(data.roleId);
    model.email = UtilHelper.setDataDefault(data.email);
    model.firstName = UtilHelper.setDataDefault(data.firstName);
    model.lastName = UtilHelper.setDataDefault(data.lastName);
    model.phone = UtilHelper.setDataDefault(data.phone);
    model.avatarUrl = UtilHelper.setDataDefault(data.avatarUrl);

    if (data.role) {
      model.role = JsonMapper.deserialize(RoleModel, data.role);
    }
    return model;
  }

  /**
   *
   * @param data
   * @returns {UserModel}
   */

  public static toRequest(data: UserModel): UserModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }

    model.roleId = UtilHelper.setDataDefault(data.roleId);
    model.email = UtilHelper.setDataDefault(data.email);
    model.firstName = UtilHelper.setDataDefault(data.firstName);
    model.lastName = UtilHelper.setDataDefault(data.lastName);
    model.phone = UtilHelper.setDataDefault(data.phone);
    model.country = UtilHelper.setDataDefault(data.country);
    model.state = UtilHelper.setDataDefault(data.state);
    model.province = UtilHelper.setDataDefault(data.province);
    model.parentId = UtilHelper.setDataDefault(data.parentId);
    model.avatarUrl = UtilHelper.setDataDefault(data.avatarUrl);
    if(data.tags && data.tags.length > 0){
      model.tags = data.tags;
    }
    if (data.password) {
      model.password = UtilHelper.setDataDefault(data.password);
    }

    return model;
  }

  /**
   *
   * @param data
   * @returns {UserModel}
   */

  public static toUpdateProfileResquest(data: UserModel): UserModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }

    model.email = UtilHelper.setDataDefault(data.email);
    model.firstName = UtilHelper.setDataDefault(data.firstName);
    model.lastName = UtilHelper.setDataDefault(data.lastName);
    model.phone = UtilHelper.setDataDefault(data.phone);
    model.avatarUrl = UtilHelper.setDataDefault(data.avatarUrl);

    return model;
  }

  public static toUpdateAvatar(data: UserModel): UserModel {
    let model: any = {};

    if (data.id) {
      model.id = UtilHelper.setDataDefault(data.id);
    }
    model.avatarUrl = UtilHelper.setDataDefault(data.avatarUrl);

    return model;
  }

  /**
   *
   * @param data
   * @returns {UserModel}
   */

  public static toChangePasswordResquest(data: UserModel): UserModel {
    let model: any = {};

    model.oldPassword = UtilHelper.setDataDefault(data.oldPassword);
    model.newPassword = UtilHelper.setDataDefault(data.newPassword);

    return model;
  }

  /**
   *
   * @param data
   * @returns {UserModel}
   */

  public static toForgotPasswordResquest(data: UserModel): UserModel {
    let model: any = {};

    model.email = UtilHelper.setDataDefault(data.email);

    return model;
  }

  /**
   *
   * @param data
   * @returns {UserModel}
   */

  public static toRegisterResquest(data: UserModel): UserModel {
    let model: any = {};

    model.roleId = UtilHelper.setDataDefault(data.roleId);
    model.email = UtilHelper.setDataDefault(data.email);
    model.firstName = UtilHelper.setDataDefault(data.firstName);
    model.lastName = UtilHelper.setDataDefault(data.lastName);
    model.phone = UtilHelper.setDataDefault(data.phone);
    model.avatarUrl = UtilHelper.setDataDefault(data.avatarUrl);
    model.password = UtilHelper.setDataDefault(data.password);

    return model;
  }

  /**
   *
   * @param data
   * @returns {UserModel}
   */

  public static toLoginResquest(data: UserModel): UserModel {
    let model: any = {};

    model.email = UtilHelper.setDataDefault(data.email);
    model.password = UtilHelper.setDataDefault(data.password);

    return model;
  }
}
