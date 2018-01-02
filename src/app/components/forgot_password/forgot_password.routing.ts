import {Routes, RouterModule}  from '@angular/router';

import {ForgotPasswordComponent} from './forgot_password.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  }
];

export const routing = RouterModule.forChild(routes);
