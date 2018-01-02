/* tslint:disable: variable-name */
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {AuthGuard} from "../../services/auth_guard.service";
import {ROLE} from "../../modules/constants";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      privileges: [ROLE.SYSTEM_ADMIN, ROLE.COMPANY_ADMIN]
    }
  }
];

export const routing = RouterModule.forChild(routes);
