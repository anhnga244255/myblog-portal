import { NgModule }      from '@angular/core';
import { routing }       from './pages.routing';

import { PageComponent } from './pages.component';
import { ThemeModule } from '../themes/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    routing
  ],
  declarations: [PageComponent],
  providers: []
})
export class PageModule {
}
