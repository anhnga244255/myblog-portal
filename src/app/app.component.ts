import './app.loader.ts';
import { Location } from '@angular/common';
import { BaseComponent } from './components/base.component';
import { PlatformHelper } from './helpers/platform.helper';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferState } from '../app/modules/transfer-state/transfer-state';

import { ConfigService } from '@ngx-config/core';
import { TranslateService } from '@ngx-translate/core';
import { MetaService } from '@ngx-meta/core';
import { STATE_EVENT, LANGUAGE, SESSION } from './modules/constants';
import { GlobalState } from './global.state';
import { ThemeSpinner } from './themes/services';
import { ThemePreloader } from './themes/services/theme_preloader/theme_preloader.service';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css'), require('./app.scss')],
  template: require('./app.component.html')
})

export class AppComponent extends BaseComponent implements OnInit {
  private showMonitor: boolean;
  private isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState,
    private cache: TransferState,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    private _spinner: ThemeSpinner,
    private readonly config: ConfigService,
    private readonly translate: TranslateService,
    private readonly meta: MetaService) {
    super(router, route, meta, location);
    this._state.subscribe(STATE_EVENT.MENU_COLLAPSED, (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  ngOnInit(): void {
    this.setMetaData(); // set meta data for SEO
    this.cache.set('cached', true);
    this.showMonitor = (ENV === 'development' && !AOT && ['monitor', 'both'].includes(STORE_DEV_TOOLS));
    this.setupSessionStorage();
  }

  public setMetaData() {
    let defaultLanguage = this.config.getSettings('i18n.defaultLanguage');
    let defaultTitle = this.config.getSettings('seo.defaultPageTitle');
    let defaultDesc = this.config.getSettings('seo.defaultMetaDescription');
    let defaultImage = this.config.getSettings('seo.defaultMetaImage');
    let defaultKeyword = this.config.getSettings('seo.defaultMetaKeyword');
    let currentLanguage = sessionStorage.getItem(SESSION.LANGUAGE_KEYWORD);

    // add available languages & set default language
    this.translate.addLangs(this.config.getSettings('i18n.availableLanguages')
      .map((language: any) => language.code));
    this.translate.setDefaultLang(defaultLanguage.code);
    this.meta.setTag('og:locale', defaultLanguage.culture);

    this.setPageTitle(defaultTitle);
    this.setMetaDescription(defaultDesc);
    this.setMetaKeyword(defaultKeyword);
    this.setMetaImage(defaultImage);
   
    if (currentLanguage) {
      defaultLanguage = JSON.parse(currentLanguage);
    }
    this.setLanguage(defaultLanguage);
  }

  public ngAfterViewInit(): void {
    ThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private setLanguage(language: any): void {
    this.translate.use(language.code).subscribe(() => {
      this.meta.setTag('og:locale', language.culture);
      sessionStorage.setItem(SESSION.LANGUAGE_KEYWORD, JSON.stringify(language));
    });

    // this.i18nRouter.changeLanguage(language.code);
  }

  public setupSessionStorage() {
    if (PlatformHelper.isPlatformBrowser()) {
      if (!sessionStorage.length) {
        localStorage.setItem('getSessionStorage', Date.now().toString());
      };
      window.addEventListener('storage', function (event) {
        if (event.key == 'getSessionStorage') {
          localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
          localStorage.removeItem('sessionStorage');
        } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
          let data = JSON.parse(event.newValue), value;
          for (let key in data) {
            sessionStorage.setItem(key, data[key]);
          }
        }
      });
    }
  }
}