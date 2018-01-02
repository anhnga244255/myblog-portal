import { NgModule }  from '@angular/core';
import { LoginComponent } from './login.component';
import { routing } from './login.routing';
import { AuthService, UserIdentityService } from '../../services';
import { SharedModule } from '../shared.module';


@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    UserIdentityService,
  ]
})
export class LoginModule {
}
