import { CategoryService } from "./../../services/category.service";
import { UserService } from "./../../services/user.service";
import { ArticlesService } from "./../../services/articles.service";
/**
 * Created by phuongho on 10/15/16.
 */
import {NgModule}      from '@angular/core';
import {SharedModule} from '../shared.module';

import {ArticlesComponent} from './articles.component';
import {routing} from './articles.routing';
import {CountryService} from '../../services';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    ArticlesComponent
  ],
  providers: [
    ArticlesService,
    UserService,
    CategoryService
  ]
})
export class ArticlesModule {
}
