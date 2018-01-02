import {NgModule}      from '@angular/core';

import {ForgotPasswordComponent} from './forgot_password.component';
import {routing}  from './forgot_password.routing';
import {AuthService} from "../../services";
import { SharedModule } from '../shared.module';


@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ForgotPasswordComponent
  ],
  providers: [
    AuthService
  ]
})
export class ForgotPasswordModule {
}
