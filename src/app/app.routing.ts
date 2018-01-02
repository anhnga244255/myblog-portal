import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);
