import {Component, ViewChild, HostListener, Input, ElementRef, AfterViewInit} from '@angular/core';
import {PlatformHelper} from "../../../helpers/platform.helper";

@Component({
  selector: 'back-top',
  styles: [require('./back_top.scss')],
  template: `
    <i #backTop class="fa fa-angle-up back-top back-top" title="Back to Top"></i>
  `
})
export class BackTop implements AfterViewInit{

  @Input() position: number = 400;
  @Input() showSpeed: number = 500;
  @Input() moveSpeed: number = 1000;

  @ViewChild('backTop') private _selector: ElementRef;

  public ngAfterViewInit() {
    this._onWindowScroll();
  }

  @HostListener('click')
  _onClick(): boolean {
    if (PlatformHelper.isPlatformBrowser()) {
      jQuery('html, body').animate({scrollTop: 0}, {duration: this.moveSpeed});
      return false;
    }
  }

  @HostListener('window:scroll')
  _onWindowScroll(): void {
    if (PlatformHelper.isPlatformBrowser()) {
      let el = this._selector.nativeElement;
      window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
    }
  }
}
