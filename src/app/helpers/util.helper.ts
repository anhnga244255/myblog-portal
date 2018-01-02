import { SESSION, LANGUAGE } from '../modules/constants';
import _ from 'lodash';
import * as format from 'string-format';

export class UtilHelper {
  constructor() {

  }

  /**
   * Set Default Data
   * @param data
   * @returns {string}
   */
  static setDataDefault(data, defaultValue: any = '') {
    let ret = data ? data : ((defaultValue !== '') ? defaultValue : '');

    return ret;
  }

  /**
   * Parse
   * @param data
   * @returns {string}
   */
  public static parseFilterToString(data) {
    let str = '';
    if (data) {
      _.forEach(data, function (item, key) {
        if (typeof item !== 'object') {
          str += key + '=' + item + '&';
        }
      });
    }

    return str.substring(0, str.length - 1);
  }

  /**
   * Parse
   * @param data
   * @returns {string}
   */
  public static parseFilterToStringNoEmpty(data) {
    let str = '';
    if (data) {
      _.forEach(data, function (item, key) {
        if (typeof item !== 'object' && item != '') {
          str += key + '=' + item + '&';
        }
      });
    }

    return str.substring(0, str.length - 1);
  }

  /**
   * Parse
   * @param string
   * @returns {object}
   */
  public static parseQueryStringToObject(string) {
    let vars = string.split('&');
    let result = {};
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
      result[pair[0]] = pair[1];
    }
    return result;
  }

  /**
   *
   * @param array
   * @param attribute
   * @param value
   * @returns {any}
   */
  public static findByAttribute(array, attribute, value) {
    return _.find(array, function (item) {
      return item[attribute] === value;
    });
  }

  /**
   *
   * @param array
   * @param attribute
   * @param value
   * @returns {Array}
   */
  public static findAllByAttribute(array, attribute, value) {
    let result = [];
    _.forEach(array, function (item) {
      if (item[attribute] === value) {
        result.push(item);
      }
    });

    return result;
  }

  /**
   * 
   * @param message 
   * @param params 
   */
  public static translate(message: string, params: any = []): string {
    let language: any = sessionStorage.getItem(SESSION.LANGUAGE_KEYWORD);

    let ret: string = message;
    let data = require('../../assets/i18n/en.json');
    if (language) {
      language = JSON.parse(language);
      if (language.code !== LANGUAGE.ENGLISH) {
        data = require('../../assets/i18n/' + language.code + '.json');
      }
    }
    if (data[message]) {
      ret = data[message];
    }

    if (_.isArray(params)) {
      ret = format(ret, params.join());
    } else if (_.isString(ret) || _.isObject(params)) {
      ret = format(ret, params);
    }
    return ret;
  }



  /**
   * Use to slice long string
   * @param desc
   * @returns {string}
   */
  public static sliceText(text: string, maxLength: number) {
    if (text.length > maxLength)
      return text.slice(0, maxLength) + '...';

    return text;
  }

}
