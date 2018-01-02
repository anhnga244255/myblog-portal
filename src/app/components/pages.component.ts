import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from './base.component';
import {MetaService} from "@ngx-meta/core";
import {Location} from "@angular/common";


@Component({
  selector: 'main-page',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <div class="wrapper">
      <!-- <page-top></page-top> -->
      <sidebar></sidebar>
      <div class='al-main'>
        <div class='al-content'>
          <!--<content-top></content-top>-->
          <router-outlet></router-outlet>
        </div>
      </div>
      <footer></footer>
    </div>
    <back-top position='200'></back-top>
  `
})
export class PageComponent extends BaseComponent {

  constructor(protected _router: Router,
              protected _route: ActivatedRoute,
              protected _meta: MetaService,
              protected _location: Location) {
    super(_router, _route, _meta, _location);
  }
}
