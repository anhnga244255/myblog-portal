import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './pages.component';
import { MetaGuard } from '@ngx-meta/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginModule',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: 'forgot-password',
    loadChildren: './forgot_password/forgot_password.module#ForgotPasswordModule',
  },
  {
    path: 'admin',
    component: PageComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'users',
        loadChildren: './users/user.module#UserModule'
      },
      {
        path: 'accounts',
        loadChildren: './accounts/account.module#AccountModule'
      },
      {
        path: 'articles',
        loadChildren: './articles/articles.module#ArticlesModule'
      },
      {
        path: 'category',
        loadChildren: './category/category.module#CategoryModule'
      },
      {
        path: 'comments',
        loadChildren: './comment/comment.module#CommentModule'
      },
    ]
  },
  {
    path: 'page-not-found',
    loadChildren: './page_not_found/page_not_found.module#PageNotFoundModule',
    canActivateChild: [MetaGuard],
  },
  { path: '**', redirectTo: 'page-not-found' }
];

export const routing = RouterModule.forChild(routes);
