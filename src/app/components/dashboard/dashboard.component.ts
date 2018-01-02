import { VariableModel } from './../../models/variable.model';
import { VariableService } from './../../services/variable.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { MetaService } from "@ngx-meta/core";
import { BaseComponent } from "../base.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'my-dashboard',
  template: require('../../views/dashboard/index.html')
})

export class DashboardComponent extends BaseComponent {
  protected pageTitle: string = 'Dashboard';

  constructor(protected _router: Router,
    protected _route: ActivatedRoute,
    protected _meta: MetaService,
    protected _location: Location) {
    super(_router, _route, _meta, _location);
  }

  ngOnInit() {
    this.setPageTitle(this.pageTitle);
  }
}
