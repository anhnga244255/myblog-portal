import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef, OnInit, OnDestroy
} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute, Routes} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import {MenuService} from './menu.service';
import {GlobalState} from '../../../global.state';
import {AuthService, UserIdentityService} from '../../../services';
import {STATE_EVENT} from '../../../modules/constants';
import {isMobile} from '../../theme.constants';
import {AppModal} from '../../../modules/modal';
import {BaseComponent} from '../../../components/base.component';
import {Modal} from 'angular2-modal';
import {MetaService} from '@ngx-meta/core';
import {Location} from "@angular/common";
import {PlatformHelper} from "../../../helpers/platform.helper";

@Component({
  selector: 'menu',
  encapsulation: ViewEncapsulation.None,
  template: require('./menu.html'),
  providers: [MenuService, AuthService]
})
export class Menu extends BaseComponent implements OnInit, OnDestroy {

  @Input() menuRoutes: Routes = [];
  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;
  private isMenuCollapsed: boolean = false;

  constructor(protected _router: Router,
              protected _route: ActivatedRoute,
              protected _meta: MetaService,
              protected _location: Location,
              private _service: MenuService,
              private _authService: AuthService,
              private _modal: Modal,
              private _state: GlobalState) {
    super(_router, _route, _meta, _location);
    this._state.subscribe(STATE_EVENT.MENU_COLLAPSED, (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    if (isMobile()) {
      this.isMenuCollapsed = true;
    }

    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });
  }

  /**
   * Logout
   * @returns {Promise<void>}
   */
  private logout() {
    try {
      return Promise.resolve()
        .then(() => {
          return AppModal.confirm(this._modal, this._t('Logout'), this._t('Are you sure you want to logout?'));
        })
        .then(() => {
          return this._authService.logout();
        })
        .then(() => {
          UserIdentityService.clearCredentials();
          this.navigate(['login']);
        })
        .catch(error => {
          if (error) {
            this.setError(error.message);
          }
        });

    } catch (error) {
      this.setError(error.message);
    }
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      if (PlatformHelper.isPlatformBrowser()) {
        jQuery('html, body').animate({scrollTop: 0}, {duration: 1000});
      }
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  public ngOnInit(): void {
    this.menuItems = this._service.convertRoutesToMenus(this.menuRoutes);
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top;
  }

  public toggleSubMenu($event): boolean {
    if (PlatformHelper.isPlatformBrowser()) {
      let submenu = jQuery($event.currentTarget).next();

      if (this.sidebarCollapsed) {
        this.expandMenu.emit(null);
        if (!$event.item.expanded) {
          $event.item.expanded = true;
        }
      } else {
        $event.item.expanded = !$event.item.expanded;
        submenu.slideToggle();
      }

      return false;
    }
  }
}
