import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserModel} from '../../models';
import {AuthService} from '../../services';
import {BaseComponent} from '../base.component';
import {MetaService} from '@ngx-meta/core';
import {Location} from "@angular/common";

@Component({
  selector: 'forgot-password',
  encapsulation: ViewEncapsulation.None,
  template: require('./.././../views/forgot_password/index.html'),
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit{
  protected pageTitle = 'Forgot Password';
  public user: UserModel;

  constructor(protected _router: Router,
              protected _route: ActivatedRoute,
              protected _meta: MetaService,
              protected _location: Location,
              private _authService: AuthService) {
    super(_router, _route, _meta, _location);
    this.user = new UserModel();
  }
  public ngOnInit() {
    this.setPageTitle(this.pageTitle);
  }
  /**
   *  forgot password
   */

  private  forgotPassword(): void {
    try {
      if (this.user.validate('forgotPasswordForm')) {

        this._authService.forgotPassword(this.user)
          .then((response) => {
            this._router.navigate(['login']);
            this.setSuccess(response.message);
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
