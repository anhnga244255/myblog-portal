import { hardCode, ROLE, COUNTRY_VIET_NAME} from "./../../modules/constants";
import { CountryModel, SearchTagsModel, TagsModel} from "./../../models";
import { CountryService} from "./../../services";
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
  selector: 'users',
  encapsulation: ViewEncapsulation.None,
  template: require('../../views/users/index.html'),
})
export class UserComponent extends BaseComponent implements OnInit {
  protected pageTitle = 'User Manage';

  protected search: SearchUserModel;
  protected searchTag: SearchTagsModel;
  private tags: TagsModel[];
  private users: UserModel[];
  private user: UserModel;
  private countrys: CountryModel[];
  private states = [];
  private provinces = [];
  private ROLE = ROLE;
  private userTag: string[];
  private COUNTRY_VIET_NAME = COUNTRY_VIET_NAME;

  @ViewChild('createEditModal') private createEditModal;

  constructor(protected _router: Router,
    protected _route: ActivatedRoute,
    protected _meta: MetaService,
    protected _location: Location,
    private _countryService: CountryService,
    private _userService: UserService,
    private _modal: Modal) {
    super(_router, _route, _meta, _location);

    this.search = new SearchUserModel();
    this.searchTag = new SearchTagsModel();
    this.user = new UserModel();
    this.initSearch();
  }

  ngOnInit() {
    this.setPageTitle(this.pageTitle);
    this.findAll();

  }

  /**
   * get all user manager
   * @param offset
   */
  public findAll(): void {
    try {
      this._userService.findAll(true, this.search)
        .then((response) => {
          this.users = response.data;
          console.log('user model', this.users);
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
   * get all
   * @param offset
   */
  public getListCountries(): void {
    try {
      this._countryService.findAll(false, this.search)
        .then((response) => {
          this.countrys = response.data;
          console.log("country", this.countrys);
        })
        .catch((error) => {
          this.setError(error);
        })
    } catch (error) {
      this.setError(error);
    }
  }

  /**
   * get all
   * @param offset
   */
  public getListStates(code: string): void {
    try {
      this._countryService.getStates(code)
        .then((response) => {
          this.states = response.data;
          console.log("aaa", response);
        })
        .catch((error) => {
          this.setError(error);
        })
    } catch (error) {
      this.setError(error);
    }

  }

  /**
   * get all
   * @param offset
   */
  public getListProvince(name: string): void {
    try {
      this._countryService.getProvince(name)
        .then((response) => {
          this.provinces = response.data;
        })
        .catch((error) => {
          this.setError(error);
        })
    } catch (error) {
      this.setError(error);
    }

  }

  /**
   * create user manager
   */
  public create() {

    // hard code for test
    if (hardCode) {
      // this.user.roleId = "company_admin";
      this.user.password = "qwerty123";
      this.user.passwordAgain = "qwerty123";
    }
    if(this.user.roleId == ROLE.PRESENTER){
      this.user.tags = this.userTag;
    }
    try {
      if (this.user.validate('formAction')) {
        console.log("user", this.user);
        this._userService.create(this.user)
          .then((response) => {
            this.findAll();
            this.setSuccess(response.message);
            this.showHideUserFromModal(false);
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
   * update user manager
   */
  public update() {
    this.user.removeRule('password', 'required');
    this.user.removeRule('password', 'alphabetsAndNumbers');
    if(this.user.roleId == ROLE.PRESENTER){
      this.user.tags = this.userTag;
    }
    try {
      if (this.user.validate('formAction')) {
        this._userService.update(this.user)
          .then((response) => {
            this.findAll();
            this.setSuccess(response.message);
            this.showHideUserFromModal(false);
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
   * show modal create
   */
  public showHideUserFromModal(isShow: boolean = true, user?: UserModel) {
    this.getData()

    if (isShow) {
      if (user) {
        // show modal edit
        this.user = JsonMapper.deserialize(UserModel, user);
        if (user && this.user.country && this.user.state, this.user.province) {
          this.getListProvince(this.user.state);
          this.getListStates(this.user.country);
          //this.getListTags();
        }
        this.userTag = []


        console.log('user edit', this.user);
        console.log('user tags', this.userTag);
      } else {
        // show modal create
        if (this.user && this.user.roleId == undefined) {
          this.user.roleId = "";
        }
        this.userTag = [];
        this.user.parentId = ""
        this.user.country = "";
        this.user.province = "";
        this.user.state = "";
      }
      this.createEditModal.show();
    } else {
      this.user = new UserModel()
      this.createEditModal.hide();
      this.user.resetForm('formAction');
    }
  }

  /**
   * call data
   */
  public getData() {
    // get list countries
    this.countrys = [];
    this.getListCountries();

    // get list role
    //this.getRole();
  }
  /**
   * delete user condo manager
   * @param id
   */
  public delete(id: string) {
    try {
      AppModal.confirm(this._modal, this._t('Delete User'), this._t('Are you sure you want to delete this user?'))
        .then(() => {
          return this._userService.delete(id)
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
  public selectedCountry($event) {
    let code = $event.target.value;

    if (code != "") {
      if(this.user.country != COUNTRY_VIET_NAME){
        this.user.province = '';
      }
      console.log("code event", code);
      this.getListStates(code)

    } else {
      this.states = [];
      this.provinces = [];
      this.user.province = '';
      this.user.state = '';
    }
  }

  public selectedState($event) {
    let name = $event.target.value;
    console.log("state", name);
    if (name != "") {
      this.getListProvince(name);
    } else {
      this.provinces = [];
      this.user.province = '';
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
      this.showHideUserFromModal();
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
