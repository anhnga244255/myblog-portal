import { Component } from '@angular/core';
import { MsgCenterService } from './msg_center.service';
import { GlobalState } from '../../../global.state';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLE, STATE_EVENT } from '../../../modules/constants';
import { BaseComponent } from '../../../components/base.component';
import {MetaService} from "@ngx-meta/core";
import {Location} from "@angular/common";

@Component({
  selector: 'msg-center',
  providers: [MsgCenterService],
  template: require('./msg_center.html')
})
export class MsgCenter extends BaseComponent {
  private totalUnReadMessage: number = 0;
  private ROLE = ROLE;
  private counter: any = {};

  constructor(protected _router: Router,
              protected _route: ActivatedRoute,
              protected _meta: MetaService,
              protected _location: Location,
              private _state: GlobalState) {
    super(_router, _route, _meta, _location);

  }
}
