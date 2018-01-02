import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalState} from '../../../../../global.state';
import {isMobile} from '../../../../theme.constants';
import {STATE_EVENT} from '../../../../../modules/constants';
import {BaseComponent} from '../../../../../components/base.component';
import {MetaService} from '@ngx-meta/core';
import {Location} from "@angular/common";

@Component({
  selector: 'menu-item',
  encapsulation: ViewEncapsulation.None,
  template: require('./menu_item.html')
})
export class MenuItem extends BaseComponent {

  @Input() menuItem: any;
  @Input() child: boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  private isMenuCollapsed: boolean = false;

  constructor(protected _router: Router,
              protected _route: ActivatedRoute,
              protected _meta: MetaService,
              protected _location: Location,
              private _state: GlobalState) {
    super(_router, _route, _meta, _location);
    this._state.subscribe(STATE_EVENT.MENU_COLLAPSED, (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    if (isMobile()) {
      this.isMenuCollapsed = true;
    }
  }

  public onHoverItem($event): void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item): boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  public canDisplay(): boolean {
    let isValid = false;

    if (this.profile && this.profile.role) {
      if (!this.menuItem.hidden && this.menuItem.privileges && this.menuItem.privileges && this.profile.role &&
        (this.menuItem.privileges.indexOf(this.profile.role.keyword) !== -1)) {
        isValid = true;
      }
    }
    return isValid;
  }
}
