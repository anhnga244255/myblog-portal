import { BaseComponent } from './../base.component';
import { MetaService } from '@ngx-meta/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from "@angular/common";
@Component({
  selector: 'page-not-found',
  template: require('./../../views/page_not_found/index.html')
})

export class PageNotFoundComponent extends BaseComponent {
  constructor(protected _router: Router,
    protected _route: ActivatedRoute,
    protected _meta: MetaService,
    protected _location: Location) {
    super(_router, _route, _meta, _location);
  }
}
