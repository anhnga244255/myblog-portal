import { PlatformHelper } from './../helpers/platform.helper';
import { SESSION } from '../modules/constants';
import { UserModel, TokenModel } from '../models';

export class UserIdentityService {
  constructor() {
    
  }

  /**
   * Set Token
   * @param data
   */
  public static setCredentials(data: TokenModel) {
    if (data.token) {
      this.setToken(data.token);
    }

    if (data.user instanceof UserModel) {
      this.setProfile(data.user);
    }
  }

  /**
   * Set User Profile
   * @param token
   */
  public static setToken(token: string = '') {
    if (PlatformHelper.isPlatformBrowser()) {
      //SESSION.set(SESSION.TOKEN_KEYWORD, token);
      sessionStorage.setItem(SESSION.TOKEN_KEYWORD, token);
    }
  }

  /**
   * Set User Profile
   * @param data
   */
  public static setProfile(data: UserModel) {
    if (PlatformHelper.isPlatformBrowser()) {
      if (data instanceof UserModel) {
        let obj = UserModel.toProfileModel(data);
        //SESSION.set(SESSION.PROFILE_KEYWORD, JSON.stringify(obj));
        sessionStorage.setItem(SESSION.PROFILE_KEYWORD, JSON.stringify(obj));
      }
    }
  }

  /**
   *
   * @returns {any}
   */
  public static getProfile() {
    if (PlatformHelper.isPlatformBrowser()) {
      // let data = SESSION.get(SESSION.PROFILE_KEYWORD);
      // if (data) {
      //   return JSON.parse(data);
      // }
      if(sessionStorage.length) {
        let session = sessionStorage;
        if(session[SESSION.PROFILE_KEYWORD]) {
          return JSON.parse(session[SESSION.PROFILE_KEYWORD]);
        }
        return {};
      }
      return {};
    }
  }

  /**
   * Clear login data
   */
  public static clearCredentials() {
    if (PlatformHelper.isPlatformBrowser()) {
      //SESSION.deleteAll();
      sessionStorage.clear();
    }
  }


  /**
   *
   * @returns {boolean}
   */
  public static isLoggedIn() {
    return this.getToken() ? true : false;
  }

  /**
   *
   * @returns {any}
   */
  public static getToken() {
    if (PlatformHelper.isPlatformBrowser()) {
      //return SESSION.get(SESSION.TOKEN_KEYWORD);
      if(sessionStorage.length) {
        let session = sessionStorage;
        if(session[SESSION.TOKEN_KEYWORD]) {
          return session[SESSION.TOKEN_KEYWORD];
        }
      }
      return null;
    }
  }
}
