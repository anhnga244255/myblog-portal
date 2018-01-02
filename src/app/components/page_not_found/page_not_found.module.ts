import { PageNotFoundComponent } from './page_not_found.component';
import { NgModule } from '@angular/core';
import { routing } from './page_not_found.routing';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    PageNotFoundComponent
  ],
  providers: [
  ]
})

export class PageNotFoundModule {
}
