/**
 * Created by phuongho on 10/15/16.
 */
import {Routes, RouterModule}  from '@angular/router';
import {UserComponent} from './user.component';
import {ROLE} from '../../modules/constants';
import {AuthGuard} from '../../services';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
          path: '',
          component: UserComponent,
          canActivate: [AuthGuard],
          data: {
              privileges: [ROLE.SYSTEM_ADMIN, ROLE.COMPANY_ADMIN, ROLE.MANAGER]
          }
    }
];

export const routing = RouterModule.forChild(routes);
