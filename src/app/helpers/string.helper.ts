import * as _ from 'lodash';

export class StringHelper {
  constructor() {

  }

  /**
   * Parse
   * @param
   * @returns {string}
   */
  static cutString(string, number) {
    var cutString = string.indexOf(' ', number);
    if (cutString === -1) return string;
    return string.substring(0, cutString);
  }

  /**
   *
   * @param str
   * @returns {string}
   */
  static trim(str: string) {
    let lines = str.split('\n');
    let temp = '';
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) {
        temp += lines[i] + '\n';
      }
    }
    return temp.trim();
  }

}
