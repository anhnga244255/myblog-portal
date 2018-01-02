import { PageNotFoundComponent } from './page_not_found.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent
  }
];

export const routing = RouterModule.forChild(routes);
