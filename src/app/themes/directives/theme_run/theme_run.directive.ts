import { Directive, HostBinding } from '@angular/core';
import { isMobile } from '../../theme.constants';


@Directive({
  selector: '[themeRun]'
})
export class ThemeRunDirective {

  private _classes: Array<string> = [];
  @HostBinding('class') classesString: string;

  constructor() {
  }

  public ngOnInit(): void {
    this._assignMobile();
  }

  private _assignMobile(): void {
    if (isMobile()) {
      this._addClass('mobile');
    }
  }

  private _addClass(cls: string) {
    this._classes.push(cls);
    this.classesString = this._classes.join(' ');
  }
}
