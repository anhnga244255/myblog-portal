import { ArticlesService } from "./../../services/articles.service";
import { CommentModel } from "./../../models/comment.model";
import { hardCode, ROLE, COUNTRY_VIET_NAME} from "./../../modules/constants";
import { CountryModel, SearchTagsModel, TagsModel, ArticlesModel} from "./../../models";
import { CommentService} from "./../../services";
import { JsonMapper } from './../../modules/mapper/json.mapper';
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { UserService } from '../../services';
import { UserModel, SearchUserModel } from '../../models';
import { AppModal } from '../../modules/modal';
import { SORT_TYPES } from '../../modules/constants';
import { BaseComponent } from '../base.component';
import { MetaService } from "@ngx-meta/core";
import { Location } from "@angular/common";

@Component({
  selector: 'comment',
  encapsulation: ViewEncapsulation.None,
  template: require('../../views/comment/index.html'),
})
export class CommentComponent extends BaseComponent implements OnInit {
  protected pageTitle = 'Comment Manage';

  protected search: SearchUserModel;
  protected searchTag: SearchTagsModel;
  private tags: TagsModel[];
  private comment: CommentModel;
  private comments : CommentModel;
  private countrys: CountryModel[];
  private articles: ArticlesModel[];
  private states = [];
  private ROLE = ROLE;
  private userTag: string[];
  private COUNTRY_VIET_NAME = COUNTRY_VIET_NAME;

  @ViewChild('commentModal') private commentModal;

  constructor(protected _router: Router,
    protected _route: ActivatedRoute,
    protected _meta: MetaService,
    protected _location: Location,
    private _commentService: CommentService,
    private _articlesService: ArticlesService,
    private _modal: Modal) {
    super(_router, _route, _meta, _location);

    this.search = new SearchUserModel();
    this.searchTag = new SearchTagsModel();
    this.comment = new CommentModel();
    this.initSearch();
  }

  ngOnInit() {
    this.setPageTitle(this.pageTitle);
    this.findAll();

  }
public getData(){
}

showCreateCommentModal() {
  this.getListArticles();
  this.commentModal.show();
}

hideCommentModel() {
  this.commentModal.hide();
}

showEditCommentModal(comment: CommentModel) {
  this.comment = comment;
  this.commentModal.show();
}
  /**
   * get all comment
   * @param offset
   */
  public findAll(): void {
    try {
      this._commentService.findAll(true, this.search)
        .then((response) => {
          this.comments = response.data;
          console.log('comment model', this.comments);
          this.totalItems = response.totalItems;
        })
        .catch((error) => {
          this.setError(error);
        })
    } catch (error) {
      this.setError(error);
    }

  }


  /**
   * create comment
   */
  public create() {
    try {
      if (this.comment.validate('formComment')) {
        this._commentService.create(this.comment)
          .then((response) => {
            this.findAll();
            this.setSuccess(response.message);
            this.hideCommentModel();
          })
          .catch((error) => {
            console.log(this.comments);
            this.setError(error);
          });
      }
    } catch (error) {
      this.setError(error);
    }
  }

  /**
   * update comment
   */
  public update() {
    try {
      if (this.comment.validate('formComment')) {
        this._commentService.update(this.comment)
          .then((response) => {
            this.findAll();
            this.setSuccess(response.message);
            this.hideCommentModel();
          })
          .catch((error) => {
            this.setError(error);
          });
      }
    } catch (error) {
      this.setError(error);
    }
  }



  /**
   * delete comment
   * @param id
   */
  public delete(id: string) {
    try {
      AppModal.confirm(this._modal, this._t('Delete Comment'), this._t('Are you sure you want to delete this comment?'))
        .then(() => {
          return this._commentService.delete(id)
            .then((response) => {
              this.findAll();
              this.setSuccess(response.message);
            })
            .catch((error) => {
              this.setError(error);
            })
        })
    } catch (error) {
      this.setError(error);
    }
  }


  // option articles
  public selectedArticles($event) {
    let name = $event.target.value;
    if (name != "") {

    } else {

    }
  }
   /**
   * get all articles
   * @param offset
   */
  public getListArticles(): void {
    try {
      this._articlesService.findAll()
        .then((response) => {
          this.articles = response.data;
        })
        .catch((error) => {
          this.setError(error);
        })
    } catch (error) {
      this.setError(error);
    }

  }
  // end aritlces option

  /**
   * get all tags
   * @param offset
   */

  public checkedTag(idTag: string) {
    if(this.checkExistArray(idTag, this.userTag)) {
      var index = this.userTag.indexOf(idTag);
      if(index >= 0) {
        this.userTag.splice(index, 1);
      }
    }else {
      this.userTag.push(idTag);
    }

    console.log(this.userTag);
  }

  public checkExistArray(id: string, arr: any): boolean {
    let isValid: boolean = false;
    console.log('id push', id)
    if(arr.length > 0) {
      for(let i = 0;i<arr.length; i++){
        if(arr[i] == id) {
          isValid = true;
          break;
        }
      }
    }

    return isValid;
  }

  public isTagsChecked(item: string): boolean {
    let isValid: boolean = false;
    if(this.userTag && this.userTag.length > 0) {
      for(let i = 0 ;i < this.userTag.length; i++) {
        if(this.userTag[i] == item) {
          isValid = true;
          break;
        }
      }
    }
    return isValid;
  }
}
