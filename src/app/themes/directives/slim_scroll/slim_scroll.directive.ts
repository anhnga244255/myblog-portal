import {Directive, Input, Output, ElementRef, EventEmitter, OnChanges} from '@angular/core';

import './slim_scroll.loader.ts';
import {PlatformHelper} from '../../../helpers';

@Directive({
  selector: '[slimScroll]'
})
export class SlimScrollDirective implements OnChanges{

  @Input() public slimScrollOptions: Object;

  constructor(private _elementRef: ElementRef) {
  }

  ngOnChanges(changes) {
    this._scroll();
  }

  private _scroll() {
    this._destroy();
    this._init();
  }

  private _init() {
    if (PlatformHelper.isPlatformBrowser()) {
      jQuery(this._elementRef.nativeElement).slimScroll(this.slimScrollOptions);
    }
  }

  private _destroy() {
    if (PlatformHelper.isPlatformBrowser()) {
      jQuery(this._elementRef.nativeElement).slimScroll({destroy: true});
    }
  }
}
