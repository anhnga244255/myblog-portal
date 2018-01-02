import { ArticlesService } from "./../../services/articles.service";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { isMobile } from "./../../themes/theme.constants";
import { CommentService } from "./../../services/comment.service";

/**
 * Created by phuongho on 10/15/16.
 */
import {NgModule}      from '@angular/core';
import {SharedModule} from '../shared.module';

import {CommentComponent} from './comment.component';
import {routing} from './comment.routing';
import {UserService, CountryService} from '../../services';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    CommentComponent
  ],
  providers: [
    CommentService,
    ArticlesService,
    UserService
  ]
})
export class CommentModule {
}
