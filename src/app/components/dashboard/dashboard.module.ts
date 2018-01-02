import { NgModule } from '@angular/core';
import { routing } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared.module';


@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
  ]
})

export class DashboardModule {
}
