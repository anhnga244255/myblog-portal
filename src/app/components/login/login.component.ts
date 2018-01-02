import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../../models';
import { AuthService, UserIdentityService } from '../../services';
import { TIME_OUT_REDIRECT, LANGUAGE, ROLE } from '../../modules/constants';
import { FlashMessage } from '../../modules/flash_message';
import { BaseComponent } from '../base.component';
import { MetaService } from "@ngx-meta/core";
import { Location } from "@angular/common";
import { SESSION } from '../../modules/constants';
import { UtilHelper } from '../../helpers/util.helper';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  template: require('./../../views/login/index.html'),
})
export class LoginComponent extends BaseComponent implements OnInit {
  protected pageTitle = 'System Login';
  public user: UserModel;

  constructor(protected _router: Router,
    protected _route: ActivatedRoute,
    private _authService: AuthService,
    protected _meta: MetaService,
    protected _location: Location) {
    super(_router, _route, _meta, _location);
    this.user = new UserModel();
  }
  public ngOnInit() {
    this.setPageTitle(this.pageTitle);
    if (UserIdentityService.isLoggedIn()) {
      let returnUrl = sessionStorage.getItem(SESSION.PREV_URL_KEYWORD);
      if (returnUrl) {
        this.navigateByUrl(returnUrl);
      } else {
        this.navigate(['/admin/dashboard']);
      }
    }
  }


  private login(): void {
    try {
      this.user.removeRule('password', 'alphabetsAndNumbers');
      if (this.user.validate('loginForm')) {
        let isValid: boolean = false;
        this._authService.login(this.user)
          .then(response => {
            if (response && response.user && response.user.role) {
              switch (response.user.role.keyword) {
                case ROLE.SYSTEM_ADMIN:
                  isValid = true;
                  break;
                  case ROLE.COMPANY_ADMIN:
                  isValid = true;
                  break;
                  case ROLE.MANAGER:
                  isValid = true;
                  break;
                default:
                  isValid = false;
              }
            }

            if (!isValid) {
              this.setError(this._t('You do not have permission to access.'));
              UserIdentityService.clearCredentials();
              return Promise.resolve(null);
            } else {
              UserIdentityService.setCredentials(response);
              let returnUrl = this._route.snapshot.queryParams.return;
              this.navigateByUrl(returnUrl ? returnUrl : '/admin/dashboard');
            }
          })
          .catch(error => {
            this.setError(error);
          });
      }
    } catch (error) {
      this.setError(error);
    }
  }
}
