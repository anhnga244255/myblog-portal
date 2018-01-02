import {isPlatformBrowser, isPlatformServer} from '@angular/common';
export class PlatformHelper {
  public static platformId: any;
  constructor() {

  }
  public static setPlatform(platformId: any) {
    this.platformId = platformId;
  }

  /**
   * check platform browser
   * @returns {boolean}
   */
  public static isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * check platform server
   * @returns {boolean}
   */
  public static isPlatformServer() {
    return isPlatformServer(this.platformId);
  }


}
