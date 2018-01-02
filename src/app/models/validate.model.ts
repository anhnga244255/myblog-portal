/**
 * Created by phuongho on 10/14/16.
 */
import * as _ from 'lodash';
import { MAX_SIZE_UPLOAD } from '../modules/constants';
import { DateHelper, UtilHelper, PlatformHelper } from '../helpers';

export class ValidateModel {
  private rules: Object = {};
  private messages: Object = {};
  private errorPlacement: Function;

  constructor() {
    if (PlatformHelper.isPlatformBrowser()) {
      this.initCustomRules();

      this.errorPlacement = function (error, element) {
        if (element.attr('type') === 'checkbox' || element.attr('type') === 'radio') {
          error.insertAfter(jQuery(element).parents().find('label'));
        } else {
          error.insertAfter(element);
        }
      };
    }
  }

  /**
   * Custom Rules
   */
  private initCustomRules(): void {
    // validate max size upload
    jQuery.validator.addMethod('maxSizeUpload', function (val, element, params) {
      params = params ? params : MAX_SIZE_UPLOAD;

      if (element && element.files.length) {
        let size = element.files[0].size;
        // unit MB
        let maxSize = params * 1024 * 1024;
        return size < maxSize;
      }

      return true;

    }, this._t(`File upload too large. Only allow {0}MB.`));

    // min files
    jQuery.validator.addMethod('minNumOfFile', function (val, element, params) {

      if (element && element.files.length) {
        let numOfFile = element.files.length;
        return numOfFile >= params;
      }

      return false;

    }, this._t(`You must choose at least {0} file(s).`));

    // max files
    jQuery.validator.addMethod('maxNumOfFile', function (val, element, params) {

      if (element && element.files.length) {
        let numOfFile = element.files.length;
        return numOfFile <= params;
      }

      return true;

    }, this._t(`You can only choose maximum {0} file(s).`));

    // password alphabets and numbers least 6
    jQuery.validator.addMethod('alphabetsAndNumbers', function (val, element) {
      return val.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,})$/);
    }, this._t(`Password must be at least 6 characters including both alphabets and numbers.`));

    // max length string
    jQuery.validator.addMethod('maxLength', function (val, element, param) {
      return val.length <= param;
    }, this._t(`Maximum {0} characters.`));

    // number
    jQuery.validator.addMethod('numeric', function (val, element, param) {
      return val.match(/^\+?[0-9().]+$/);
    }, this._t(`Invalid number.`));


    // contrain valid website
    jQuery.validator.addMethod('website', function (val, element) {
      return val.match(/^((https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/);
    }, this._t(`Invalid website address.`));
    // format email
    jQuery.validator.addMethod('formatEmail', function (val, element) {
      return val.match(/^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }, this._t(`Invalid email address.`));

    // compare start date, end date
    jQuery.validator.addMethod('compareDate',
      function (val, element, params) {
        if (DateHelper.isValidDate(val) && DateHelper.isValidDate(jQuery(params).val())) {
          return DateHelper.compareDate(val, jQuery(params).val());
        }
        return true;
      }, this._t('Start date must be greater than {0}.'));

    jQuery.validator.addMethod('notEmpty',
      function (val, element, params) {
        return val.trim();
      }, this._t(''));

    jQuery.validator.addMethod('minStrict', function (value, el, param) {
      return value > param;
    }, this._t('Number must be greater than {0}.'));

    jQuery.validator.addMethod("extensionZip", function(value, param) {
      param = typeof param === "string" ? param.replace(/,/g, '|') : "zip";
      return value.match(new RegExp(".(" + param + ")$", "i"));
    }, this._t('Only allow file *.zip.'));
  }


  /**
   *
   * @param fieldName
   * @param rule
   * @param value
   * @param message
   */
  public addRule(fieldName: string, rule: string, value: any = true, message: string = '') {

    if (this.rules && !_.isObject(this.rules[fieldName])) {
      this.rules[fieldName] = {};
    }

    if (this.messages && !_.isObject(this.messages[fieldName])) {
      this.messages[fieldName] = {};
    }

    this.rules[fieldName][rule] = value;

    if (message) {
      this.messages[fieldName][rule] = message;
    }

  }

  /**
   *
   * @param fieldName
   * @param rule
   * @param value
   * @param message
   */
  public removeRule(fieldName: string, rule: string) {

    if (this.rules && _.isObject(this.rules[fieldName])) {
      this.rules[fieldName][rule] = false;
    }
  }

  /**
   * Get validate rule
   * @returns {ValidateModel}
   */
  public getRules(): ValidateModel {

    return this;
  }

  /**
   * Get Validate Message
   * @param message
   * @returns {string}
   */
  public _t(message: string): string {
    return UtilHelper.translate(message);
  }

}
