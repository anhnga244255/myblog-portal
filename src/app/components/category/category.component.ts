import { CategoryModel } from "./../../models/category.model";
import { hardCode, ROLE, COUNTRY_VIET_NAME} from "./../../modules/constants";
import { CountryModel, SearchTagsModel, TagsModel} from "./../../models";
import { CategoryService} from "./../../services";
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
  selector: 'category',
  encapsulation: ViewEncapsulation.None,
  template: require('../../views/category/index.html'),
})
export class CategoryComponent extends BaseComponent implements OnInit {
  protected pageTitle = 'Category Manage';

  protected search: SearchUserModel;
  protected searchTag: SearchTagsModel;
  private tags: TagsModel[];
  private users: UserModel[];
  private user: UserModel;
  private category: CategoryModel;
  private categories : CategoryModel;
  private countrys: CountryModel[];
  private states = [];
  private provinces = [];
  private ROLE = ROLE;
  private userTag: string[];
  private COUNTRY_VIET_NAME = COUNTRY_VIET_NAME;

  @ViewChild('categoryModal') private categoryModal;

  constructor(protected _router: Router,
    protected _route: ActivatedRoute,
    protected _meta: MetaService,
    protected _location: Location,
    private _categoryService: CategoryService,
    private _modal: Modal) {
    super(_router, _route, _meta, _location);

    this.search = new SearchUserModel();
    this.searchTag = new SearchTagsModel();
    this.user = new UserModel();
    this.category = new CategoryModel();
    this.initSearch();
  }

  ngOnInit() {
    this.setPageTitle(this.pageTitle);
    this.findAll();

  }
public getData(){
}

showCreateCategoryModal() {
  this.categoryModal.show();
}

hideCategoryModel() {
  this.categoryModal.hide();
}

showEditCategoryModal(category: CategoryModel) {
  this.category = category;
  this.categoryModal.show();
}
  /**
   * get all category
   * @param offset
   */
  public findAll(): void {
    try {
      this._categoryService.findAll(true, this.search)
        .then((response) => {
          this.categories = response.data;
          console.log('category model', this.categories);
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
   * create category
   */
  public create() {
    try {
      if (this.category.validate('formCategory')) {
        this._categoryService.create(this.category)
          .then((response) => {
            this.findAll();
            this.setSuccess(response.message);
            this.hideCategoryModel();
          })
          .catch((error) => {
            console.log(this.categories);
            this.setError(error);
          });
      }
    } catch (error) {
      this.setError(error);
    }
  }

  /**
   * update category
   */
  public update() {
    try {
      if (this.category.validate('formCategory')) {
        this._categoryService.update(this.category)
          .then((response) => {
            this.findAll();
            this.setSuccess(response.message);
            this.hideCategoryModel();
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
   * delete category
   * @param id
   */
  public delete(id: string) {
    try {
      AppModal.confirm(this._modal, this._t('Delete Cateory'), this._t('Are you sure you want to delete this category?'))
        .then(() => {
          return this._categoryService.delete(id)
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
  /**
     * get all role
       * @param offset
       */


  /**
   *
   * @param user
   */
  public createUserExistRole(user?: UserModel) {
    if (user) {
      this.user = new UserModel();
      this.user.roleId = user.roleId;
    }
  }
  /**
   *
   * @param
   */


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
