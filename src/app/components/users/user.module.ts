/**
 * Created by phuongho on 10/15/16.
 */
import {NgModule}      from '@angular/core';
import {SharedModule} from '../shared.module';

import {UserComponent} from './user.component';
import {routing} from './user.routing';
import {UserService, CountryService} from '../../services';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    UserService,
    CountryService,
  ]
})
export class UserModule {
}
