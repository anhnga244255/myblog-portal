import { Routes, RouterModule } from '@angular/router';

import { ROLE } from "../../modules/constants";
import { AccountComponent } from "./account.component";
import { AuthGuard } from "../../services/auth_guard.service";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
    ],
    data: {
      privileges: [ROLE.SYSTEM_ADMIN]
    }
  }
];

export const routing = RouterModule.forChild(routes);
