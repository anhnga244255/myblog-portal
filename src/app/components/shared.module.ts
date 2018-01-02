import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';
import { TranslateModule } from '@ngx-translate/core';
import {ModalModule} from "ngx-bootstrap";
import {AuthGuard} from "../services/auth_guard.service";

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    TranslateModule,
  ],
  declarations: [
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2PaginationModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
