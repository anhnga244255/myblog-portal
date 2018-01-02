import {PlatformHelper} from '../../../helpers';

export class ThemeSpinner {

  private _selector: string = 'preloader';
  private _element: HTMLElement;

  constructor() {
    if (PlatformHelper.isPlatformBrowser()) {
      this._element = document.getElementById(this._selector);
    }
  }

  public show(): void {
    if (PlatformHelper.isPlatformBrowser()) {
      jQuery(`#${this._selector}`).show();
    }
  }

  public hide(delay: number = 0): void {
    if (PlatformHelper.isPlatformBrowser()) {
      setTimeout(() => {
         jQuery(`#${this._selector}`).hide();
      }, delay);
    }
  }
}
