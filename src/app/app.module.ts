import { ThemeModule } from './themes/theme.module';
/**
 * This module is the entry for your App when NOT using universal.
 *
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.
 */

import { ApplicationRef, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { Store } from '@ngrx/store';
// libs
import { HttpTransferModule } from '@ngx-universal/state-transfer';
import { CacheModule } from '@ngx-cache/core';
import { ConfigLoader, ConfigModule, ConfigService } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
import { ConfigFsLoader } from '@ngx-config/fs-loader';
import { UniversalConfigLoader } from '@ngx-universal/config-loader';
import { UniversalTranslateLoader } from '@ngx-universal/translate-loader';
import { MetaLoader, MetaModule, MetaStaticLoader } from '@ngx-meta/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  BrowserTransferStateModule
} from '../app/modules/transfer-state/browser-transfer-state.module';

import { APP_DECLARATIONS } from './app.declarations';
import { APP_ENTRY_COMPONENTS } from './app.entry-components';
import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';

import { routes } from './app.routing';

import { AppComponent } from './app.component';

import { AppState } from './reducers';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'angular2-modal';
import { SESSION } from "./modules/constants";
import { PlatformHelper } from "./helpers/platform.helper";

// for AoT compilation
export function configFactory(platformId: any, http: Http): ConfigLoader {
  const serverLoader = new ConfigFsLoader(`./assets/config.json`);
  const browserLoader = new ConfigHttpLoader(http, './assets/config.json');

  return new UniversalConfigLoader(platformId, serverLoader, browserLoader);
}

export function metaFactory(config: ConfigService, translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string) => translate.get(key),
    pageTitlePositioning: config.getSettings('seo.pageTitlePositioning'),
    pageTitleSeparator: config.getSettings('seo.pageTitleSeparator'),
    applicationName: config.getSettings('system.applicationName'),
    applicationUrl: config.getSettings('system.applicationUrl'),
    defaults: {
      title: config.getSettings('seo.defaultPageTitle'),
      description: config.getSettings('seo.defaultMetaDescription'),
      generator: config.getSettings('seo.defaultPageTitle'),
      'twitter:title': config.getSettings('seo.defaultPageTitle'),
      'twitter:description': config.getSettings('seo.defaultMetaDescription'),
      'twitter:image': config.getSettings('seo.defaultMetaImage'),
      'twitter:card': 'summary',
      'og:title': config.getSettings('seo.defaultPageTitle'),
      'og:description': config.getSettings('seo.defaultMetaDescription'),
      'og:type': 'article',
      'og:image': config.getSettings('seo.defaultMetaImage'),
      'og:site_name': config.getSettings('system.applicationName'),
      'og:locale': config.getSettings('i18n.defaultLanguage.culture'),
      'og:locale:alternate': config.getSettings('i18n.availableLanguages')
        .map((language: any) => language.culture).toString(),

    }
  });
}

export function translateFactory(platformId: any, http: HttpClient): TranslateLoader {
  const browserLoader = new TranslateHttpLoader(http);

  return new UniversalTranslateLoader(platformId, browserLoader, './assets/i18n');
}

@NgModule({
  declarations: [
    AppComponent,
    APP_DECLARATIONS
  ],
  entryComponents: [APP_ENTRY_COMPONENTS],
  imports: [
    CommonModule,
    DEV_SERVER ? [BrowserAnimationsModule, BrowserTransferStateModule] : [],
    HttpClientModule,
    HttpModule,
    APP_IMPORTS,
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }),
    CacheModule.forRoot(),
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: (configFactory),
      deps: [PLATFORM_ID, Http]
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [ConfigService, TranslateService]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateFactory),
        deps: [PLATFORM_ID, HttpClient]
      }
    }),
    ModalModule.forRoot(),
    BootstrapModalModule,
    ThemeModule.forRoot()
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  providers: [APP_PROVIDERS]
})

export class AppModule {
  constructor( @Inject(PLATFORM_ID) private readonly platformId: any,
    public appRef: ApplicationRef,
    private _store: Store<AppState>) {
    // set platform id
    PlatformHelper.setPlatform(platformId);
  }

  public hmrOnInit(store) {
    if (!store || !store.rootState) return;

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  public hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this._store.take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  public hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
