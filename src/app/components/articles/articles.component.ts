import { ArticlesService } from "./../../services/articles.service";
import { hardCode, ROLE, COUNTRY_VIET_NAME} from "./../../modules/constants";
import { CountryModel, SearchTagsModel, TagsModel} from "./../../models";
import { CategoryService} from "./../../services";
import { JsonMapper } from './../../modules/mapper/json.mapper';
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { UserService } from '../../services';
import { UserModel, SearchUserModel, ArticlesModel,CategoryModel } from '../../models';
import { AppModal } from '../../modules/modal';
import { SORT_TYPES } from '../../modules/constants';
import { BaseComponent } from '../base.component';
import { MetaService } from "@ngx-meta/core";
import { Location } from "@angular/common";

@Component({
  selector: 'articles',
  encapsulation: ViewEncapsulation.None,
  template: require('../../views/articles/index.html'),
})
export class ArticlesComponent extends BaseComponent implements OnInit {
  protected pageTitle = 'Articles Manage';

  protected search: SearchUserModel;
  protected searchTag: SearchTagsModel;
  private tags: TagsModel[];
  private users: UserModel[];
  private user: UserModel;
  private categories: CategoryModel[];
  private article : ArticlesModel;
  private articles : ArticlesModel[];
  private states = [];
  private provinces = [];
  private ROLE = ROLE;
  private userTag: string[];
  private COUNTRY_VIET_NAME = COUNTRY_VIET_NAME;

  @ViewChild('articlesModal') private articlesModal;

  constructor(protected _router: Router,
    protected _route: ActivatedRoute,
    protected _meta: MetaService,
    protected _location: Location,
    private _userService: UserService,
    private _articleService: ArticlesService,
    private _categoryService: CategoryService,
    private _modal: Modal) {
    super(_router, _route, _meta, _location);

    this.search = new SearchUserModel();
    this.searchTag = new SearchTagsModel();
    this.article = new ArticlesModel();
    this.user = new UserModel();
    this.initSearch();
  }

  ngOnInit() {
    this.setPageTitle(this.pageTitle);
    this.findAll();

  }
  public getData(){
  }

  showCreateArticleModal() {
    this.getListCategory();
    this.articlesModal.show();
  }

  hideArticleModel() {
    this.articlesModal.hide();
  }

  showEditArticleModal(article : ArticlesModel) {
    this.getListCategory();
    this.article = article;
    this.articlesModal.show();
  }


  /**
   * get all articles
   * @param offset
   */
  public findAll(): void {
    try {
      this._articleService.findAll(true, this.search)
        .then((response) => {
          this.articles = response.data;
          console.log('article model', this.articles);
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
   * create articles
   */
  public create() {

    try {
      console.log(this.article);
      if (this.article.validate('formArticle')) {
        this._articleService.create(this.article)
          .then((response) => {
            this.findAll();
            this.setSuccess(response.message);
            this.hideArticleModel();
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
   * update articles
   */
  public update() {
    try {
      if (this.article.validate('formAction')) {
        this._articleService.update(this.article)
          .then((response) => {
            this.findAll();
            this.setSuccess(response.message);
            this.hideArticleModel();
          })
          .catch((error) => {
            this.setError(error);
          });
      }
    } catch (error) {
      this.setError(error)
    }
  }

  /**
   * delete article
   * @param id
   */
  public delete(id: string) {
    try {
      AppModal.confirm(this._modal, this._t('Delete article'), this._t('Are you sure you want to delete this article?'))
        .then(() => {
          return this._articleService.delete(id)
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

  // option category
  public selectedCategory($event) {
    let name = $event.target.value;
    console.log("category", name);
    if (name != "") {
      this.getListCategory();
    } else {
      // this.category = [];
      // this.user.category = '';
    }
  }
   /**
   * get all category
   * @param offset
   */
  public getListCategory(): void {
    try {
      this._categoryService.findAll()
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          this.setError(error);
        })
    } catch (error) {
      this.setError(error);
    }

  }
  // end category option

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
