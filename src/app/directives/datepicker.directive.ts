/**
 * Created by phuongho on 7/23/16.
 */
import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { DATEPICKER_FORMAT, MOMENT_DATE_FORMAT } from '../modules/constants';
import { DateHelper } from '../helpers/date.helper';
import {PlatformHelper} from '../helpers/platform.helper';

@Directive({
  selector: '[newdatepicker]',
})

export class DatePickerDirective {
  private htmlElement: HTMLElement;

  @Input('format') format: string = DATEPICKER_FORMAT.MMM_YYYY;
  @Input('value') value: string | Date;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);

  constructor(private el: ElementRef) {

    this.htmlElement = el.nativeElement;

  }

  public ngOnInit(): void {
    if (PlatformHelper.isPlatformBrowser()) {
      let temp = this.ngModelChange;
      let object = this;
      let count = 1;
      jQuery(this.htmlElement).datepicker({
        format: this.format,
        startView: 1,
        minViewMode: 1,
      }).on('changeMonth', function (e) {
        let date = DateHelper.toFormat(e.date, MOMENT_DATE_FORMAT.MM_YYYY);
        temp.emit(date);
      }).on('show', function (e) {
        if (count === 1) {
          jQuery(this).datepicker('setDate', this.value);
          jQuery(this).datepicker('update');
          count = count + 1;
        }
      });
    }
  }
}
