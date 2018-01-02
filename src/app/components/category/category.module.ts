import { CategoryService } from "./../../services/category.service";
/**
 * Created by phuongho on 10/15/16.
 */
import {NgModule}      from '@angular/core';
import {SharedModule} from '../shared.module';

import {CategoryComponent} from './category.component';
import {routing} from './category.routing';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    CategoryComponent
  ],
  providers: [
    CategoryService,
  ]
})
export class CategoryModule {
}
