/**
 * Created by phuongho on 10/14/16.
 */
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessage } from '../modules';
import { PAGINATION, SESSION, SORT_TYPES } from '../modules/constants';
import { Title } from '@angular/platform-browser';
import { UtilHelper } from '../helpers/util.helper';
import { UserModel } from '../models';
import { UserIdentityService } from '../services/user_identity.service';
import { MetaService } from "@ngx-meta/core";
import { PlatformHelper } from '../helpers/platform.helper';
import { Location } from "@angular/common";
import _ from 'lodash';

export class BaseComponent {
  public profile: UserModel;
  protected pageTitle = '';
  protected totalItems: number = 0;
  protected currentPage: number = 1;
  protected maxSize: number = PAGINATION.MAX_SIZE;
  protected itemsPerPage: number = PAGINATION.ITEMS_PER_PAGE;
  protected pageSizes = PAGINATION.PAGE_ITEM_SIZE;

  protected selectedId = [];
  protected bulkAll: boolean = false;

  protected search: any;
  protected isShowPassword: boolean = false;
  protected isShowPasswordAgain: boolean = false;
  protected isShowOldPassword: boolean = false;
  protected currentLocation: string = '';
  protected currentLanguage: any;
  protected isASC: boolean = false;

  constructor(protected _router: Router,
    protected _route: ActivatedRoute,
    protected _meta: MetaService,
    protected _location: Location,
  ) {
    this.currentLocation = this._router.url;
    if (UserIdentityService.getProfile()) {
      this.profile = UserIdentityService.getProfile();
    } else {
      this.profile = new UserModel();
    }
    this._router.events.subscribe(() => {
      if (this.currentLocation !== this._router.url) {
        if (PlatformHelper.isPlatformBrowser()) {
          sessionStorage.setItem(SESSION.NEXT_URL_KEYWORD, this._router.url);
          sessionStorage.setItem(SESSION.PREV_URL_KEYWORD, this.currentLocation);
        }
      }
    });
    let currentLanguage: any = sessionStorage.getItem(SESSION.LANGUAGE_KEYWORD);
    if (currentLanguage) {
      currentLanguage = JSON.parse(currentLanguage);
      this.currentLanguage = currentLanguage;
    }
  }

  public initSearch() {
    _.forOwn(this._route.snapshot.queryParams, (value, key) => {
      if (value) {
        if (key == 'page') {
          this.currentPage = parseInt(value);
        }
        this.search[key] = value;
      }
    });
  }

  /**
   * Set meta title
   * @param title
   */
  public setPageTitle(title: string = ''): void {
    this._meta.setTitle(`${this.pageTitle}`);
    this._meta.setTag('og:title', `${this.pageTitle}`);
  }
  /**
   * Set meta keyword
   * @param keyword 
   */
  public setMetaKeyword(keyword: string = ''): void {
    this._meta.setTag('keywords', `${keyword}`);
  }

  /**
   * Set meta description
   * @param keyword 
   */
  public setMetaDescription(description: string = ''): void {
    // For Google
    this._meta.setTag('description', `${description}`);

    // For Facebook
    this._meta.setTag('og:type', `article`);
    this._meta.setTag('og:description', `${description}`);

    // For Twitter
    this._meta.setTag('twitter:card', `summary`);
    this._meta.setTag('twitter:description', `${description}`);
  }

  /**
   * Set Meta Image
   * @param url 
   */
  public setMetaImage(url: string = '') {
    // For Facebook
    this._meta.setTag('og:image', `${url}`);

    // For Twitter
    this._meta.setTag('twitter:image', `${url}`);
  }

  /**
   * Set error message
   * @param message
   */
  public setError(error: any = {}): void {
    if (error.message) {
      FlashMessage.setError(error.message);
    } else {
      FlashMessage.setError(error);
    }
  }


  /**
   * Set success message
   * @param message
   */
  public setSuccess(message: string): void {
    FlashMessage.setSuccess(message);
  }

  /**
   * Set info message
   * @param message
   */

  public setInfo(message: string): void {
    FlashMessage.setInfo(message);
  }

  /**
   * Set warning message
   * @param message
   */
  public setWarning(message: string): void {
    FlashMessage.setWarning(message);
  }

  /**
   *
   * @param route
   */
  public navigate(route: any[], queryParams: any = {}): void {
    this._router.navigate(route, { queryParams: queryParams });
  }

  /**
   *
   * @param route
   */
  public navigateByUrl(url: string): void {
    this._router.navigateByUrl(url);
  }

  /**
   * Get List Data
   * @param offset
   */
  public findAll(search: any = null, offset: number = 0): void {
  }

  public setUrl() {
    let url = this.currentLocation.split("?")[0].split("#")[0];
    this._location.replaceState(url + '?' + UtilHelper.parseFilterToStringNoEmpty(this.search));
  }

  /**
   * Filter data
   * @param $event
   */
  public filter($event): void {
    let name = $event.target.name;
    let value = $event.target.value;
    this.search[name] = value;
    this.pageChanged(1);
    //this.findAll(this.search);
    //this.setUrl();
  }


  /**
   * Check all
   * @param event
   */
  public checkAll(data: any[], event): void {
    this.bulkAll = event.target.checked;
    if (event.target.checked) {
      if (data) {
        this.selectedId = data.map(function (item) {
          return item.id;
        });
      }
    } else {
      this.unCheckAll();
    }
  }

  /**
   * uncheck all
   */
  public unCheckAll(): void {
    this.bulkAll = false;
    this.selectedId = [];
  }

  /**
   * Page Chanage
   * @param event
   */
  public pageChanged(page: any): void {
    let offset = (page - 1) * this.itemsPerPage;
    this.currentPage = parseInt(page);
    this.scrollToTop();
    this.search.page = this.currentPage;
    this.search.offset = offset;
    this.findAll(this.search, offset);
    this.setUrl();
    this.unCheckAll();
  }

  /**
   * scroll to top
   */
  public scrollToTop() {
    jQuery('html, body').animate({ scrollTop: 0 }, { duration: 1000 });
  }

  /**
   * Page Size Change
   * @param event
   */
  public pageSizeChanged(event): void {
    let itemsPerPage = event.target.value;
    this.itemsPerPage = itemsPerPage;
    this.search.limit = itemsPerPage;
    this.findAll(this.search);
    this.setUrl();
  }

  /**
   * Check One
   * @param item
   */
  public checkOne(item: any): void {
    let index = this.selectedId.indexOf(item);
    if (index === -1) {
      this.selectedId.push(item);
    } else {
      this.selectedId.splice(index, 1);
    }
  }

  /**
   * show old password
   */
  public showOldPassword(): void {
    this.isShowOldPassword = !this.isShowOldPassword;
    if (this.isShowOldPassword) {
      jQuery('#oldPassword').attr('type', 'text');
    } else {
      jQuery('#oldPassword').attr('type', 'password');
    }
  }

  /**
   * Show password action
   */

  public showPassword(): void {
    this.isShowPassword = !this.isShowPassword;
    if (this.isShowPassword) {
      jQuery('#password').attr('type', 'text');
    } else {
      jQuery('#password').attr('type', 'password');
    }
  }

  /**
   * show password again
   */
  public showPasswordAgain(): void {
    this.isShowPasswordAgain = !this.isShowPasswordAgain;
    if (this.isShowPasswordAgain) {
      jQuery('#passwordAgain').attr('type', 'text');
    } else {
      jQuery('#passwordAgain').attr('type', 'password');
    }
  }

  /**
   * Get Validate Message
   * @param message
   * @returns {string}
   */
  public _t(message: string): string {
    return UtilHelper.translate(message);
  }

  /**
   * Sort data
   * @param $event
   */
  public sort(field: string): void {
    this.search.sortBy = field;

    switch (this.isASC) {
      case true:
        this.search.sortType = SORT_TYPES.ASC;
        this.isASC = false;
        break;
      case false:
        this.search.sortType = SORT_TYPES.DESC;
        this.isASC = true;
        break;
      default:
        this.search.sortType = SORT_TYPES.DESC;
        this.isASC = true;
    }
    this.findAll(this.search);
    this.setUrl();
  }
}
