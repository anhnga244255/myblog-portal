import { SESSION } from './../../../modules/constants';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@ngx-config/core';
import { isMobile } from './../../theme.constants';
import { MENU } from './../../../app-menu';
import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import { GlobalState } from '../../../global.state';
import { layoutSizes } from '../../../themes/theme.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLE, STATE_EVENT, AVATAR_DEFAULT } from '../../../modules/constants';
import { BaseComponent } from '../../../components/base.component';
import {MetaService} from "@ngx-meta/core";
import {PlatformHelper} from "../../../helpers/platform.helper";
import {Location} from "@angular/common";

@Component({
  selector: 'sidebar',
  encapsulation: ViewEncapsulation.None,
  template: require('./sidebar.html')
})
export class Sidebar extends BaseComponent implements OnInit, AfterViewInit {

  // here we declare which routes we want to use as a menu in our sidebar
  public routes = _.cloneDeep(MENU); // we're creating a deep copy since we are going to change that object

  public menuHeight: number;
  public isMenuCollapsed: boolean = false;
  public isMenuShouldCollapsed: boolean = false;
  public ROLE_LIST = ROLE;
  public AVATAR_DEFAULT = AVATAR_DEFAULT;
  private languages: any;

  constructor(private _elementRef: ElementRef,
              protected _router: Router,
              protected _route: ActivatedRoute,
              protected _meta: MetaService,
              protected _config: ConfigService,
              protected _translate: TranslateService,
              protected _location: Location,
              private _state: GlobalState) {
    super(_router, _route, _meta, _location);
    this._state.subscribe(STATE_EVENT.MENU_COLLAPSED, (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    // listen event update profile
    this._state.subscribe(STATE_EVENT.UPDATE_PROFILE, (user) => {
      this.profile = user;
    });
  }

  public ngOnInit(): void {
    if (isMobile()) {
      this.menuCollapse();
    }
    this.languages = this._config.getSettings("i18n.availableLanguages");
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.updateSidebarHeight());
  }

  @HostListener('window:resize')
  public onWindowResize(): void {

    let isMenuShouldCollapsed = this._shouldMenuCollapse();

    if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
      this.menuCollapseStateChange(isMenuShouldCollapsed);
    }
    this.isMenuShouldCollapsed = isMenuShouldCollapsed;
    this.updateSidebarHeight();
  }

  public menuExpand(): void {
    this.menuCollapseStateChange(false);
  }

  public menuCollapse(): void {
    this.menuCollapseStateChange(true);
  }

  public menuCollapseStateChange(isCollapsed: boolean): void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged(STATE_EVENT.MENU_COLLAPSED, this.isMenuCollapsed);
  }

  public updateSidebarHeight(): void {
    // TODO: get rid of magic 84 constant
    this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84;
  }

  private _shouldMenuCollapse(): boolean {
    if (PlatformHelper.isPlatformBrowser()) {
      return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
    }
  }
/**
 * 
 * @param language 
 */
  private changeLanguage(language: any): void {
    this._translate.use(language.code).subscribe(() => {
      this._meta.setTag('og:locale', language.culture);
      sessionStorage.setItem(SESSION.LANGUAGE_KEYWORD, JSON.stringify(language));
      this.currentLanguage = language;
    });
  }
}
