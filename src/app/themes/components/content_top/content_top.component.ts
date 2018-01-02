import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'content-top',
  styles: [require('./content_top.scss')],
  template: require('./content_top.html'),
})
export class ContentTop {

  public activePageTitle:string = '';

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }
}
