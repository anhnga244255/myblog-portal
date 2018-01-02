import { Modal } from 'angular2-modal/plugins/bootstrap';
import { AppModal } from './../../../modules/modal';
import { UserIdentityService } from './../../../services/user_identity.service';
import { AVATAR_DEFAULT } from './../../../modules/constants';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services';
import { STATE_EVENT } from '../../../modules/constants';
import { BaseComponent } from '../../../components/base.component';
import { GlobalState } from '../../../global.state';
import {MetaService} from "@ngx-meta/core";
import {Location} from "@angular/common";

@Component({
  selector: 'page-top',
  template: require('./page_top.html'),
  encapsulation: ViewEncapsulation.None,
  providers: [AuthService]

})
export class PageTop extends BaseComponent {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  public listTabs: Array<any> = [];
  public locationPath: string;
  private AVATAR_DEFAULT = AVATAR_DEFAULT;

  constructor(protected _router: Router,
              protected _route: ActivatedRoute,
              protected _meta: MetaService,
              protected _location: Location,
              private _authService: AuthService,
              private _modal: Modal,
              private _state: GlobalState) {
    super(_router, _route, _meta, _location);

    this._state.subscribe(STATE_EVENT.MENU_COLLAPSED, (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged(STATE_EVENT.MENU_COLLAPSED, this.isMenuCollapsed);
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

   /**
   * Logout
   * @returns {Promise<void>}
   */
  private logout() {
    try {
      return Promise.resolve()
        .then(() => {
          return AppModal.confirm(this._modal, this._t('Logout'), this._t('Are you sure you want to logout?'));
        })
        .then(() => {
          return this._authService.logout();
        })
        .then(() => {
          UserIdentityService.clearCredentials();
          this.navigate(['login']);
        })
        .catch(error => {
          if (error) {
            this.setError(error.message);
          }
        });

    } catch (error) {
      this.setError(error.message);
    }
  }
}
