import { NgModule } from '@angular/core';
import { SharedModule } from './../shared.module';
import { AccountComponent } from './account.component';
import {routing}from './account.routing';
import {UserService, MediaService} from "../../services";

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    AccountComponent
  ],
  providers: [
    UserService,
    MediaService
  ]
})
export class AccountModule {
}
