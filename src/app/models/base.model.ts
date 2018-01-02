/**
 * Created by phuongho on 10/14/16.
 */
import { ValidateModel } from './validate.model';
import { UtilHelper } from '../helpers/util.helper';
import { Json } from '../modules';

export class BaseModel {
  @Json('id')
  public id: string = undefined;

  @Json('createdDate')
  public createdDate: string = undefined;

  @Json('updatedDate')
  public updatedDate: string = undefined;

  @Json('isEnable')
  public isEnable: any = undefined;

  @Json('isDeleted')
  public isDeleted: boolean = undefined;

  public validateRules: ValidateModel;

  constructor() {
  }

  /**
   * Validate rule
   * @returns {}
   */

  public initValidateRules(): ValidateModel {
    return this.validateRules.getRules();
  }

  /**
   * to request model
   * @param data
   * @returns {any}
   */
  public static toRequest(data: any): any {
  }

  /**
   *
   * @param fieldName
   * @param rule
   * @param value
   * @param message
   */
  public addRule(fieldName: string, rule: string, value: any = true, message: string = '') {
    this.validateRules.addRule(fieldName, rule, value, message);
  }

  /**
   *
   * @param fieldName
   * @param rule
   * @param value
   * @param message
   */
  public removeRule(fieldName: string, rule: string) {
    this.validateRules.removeRule(fieldName, rule);
  }

  /**
   *
   * @param fieldName
   * @param rule
   */
  public removeAllRule() {
    this.validateRules = new ValidateModel();
  }

  /**
   * Get validate rule
   * @returns {ValidateModel}
   */
  public getRules(): ValidateModel {
    return this.validateRules.getRules();
  }

  /**
   * validate form data
   * @param formElementId
   * @param rules
   * @returns {any}
   */
  public validate(formElementId: string, ruleModel?: ValidateModel): boolean {
    let form = jQuery('#' + formElementId);

    this.resetForm(formElementId, ruleModel);

    if (ruleModel != null) {
      form.validate(ruleModel);
    } else {
      form.validate(this.getRules());
    }
    return form.valid();
  }

  /**
   * Reset validate form data
   * @param formElementId
   * @param rules
   */
  public resetForm(formElementId: string, ruleModel?: ValidateModel): void {
    let form = jQuery('#' + formElementId);
    let validation = form.validate();
    let obj: any = this.getRules();

    if (ruleModel != null) {
      obj = ruleModel;
    }

    validation.resetForm();
    validation.settings.rules = obj.rules;
    validation.settings.messages = obj.messages;
    validation.settings.errorPlacement = obj.errorPlacement;
  }


  /**
   * Get Validate Message
   * @param message
   * @returns {string}
   */
  public _t(message: string, params: any = []): string {
    return UtilHelper.translate(message, params);
  }
}
