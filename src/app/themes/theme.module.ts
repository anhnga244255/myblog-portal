import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BackTop,
  Checkbox,
  ContentTop,
  MenuItem,
  Menu,
  MsgCenter,
  PageTop,
  Sidebar,
  Footer
} from './components';

import {
  ScrollPositionDirective,
  ThemeRunDirective
} from './directives';
import { ThemeSpinner } from './services/theme_spinner/theme_spinner.service';
import { ThemePreloader } from './services/theme_preloader/theme_preloader.service';

const THEME_COMPONENTS = [
  BackTop,
  Checkbox,
  ContentTop,
  MenuItem,
  Menu,
  MsgCenter,
  PageTop,
  Sidebar,
  Footer
];

const THEME_DIRECTIVES = [
  ScrollPositionDirective,
  ThemeRunDirective,
];

const THEME_PIPES = [
];

const THEME_SERVICES = [
  ThemeSpinner,
  ThemePreloader
];

@NgModule({
  declarations: [
    ...THEME_PIPES,
    ...THEME_DIRECTIVES,
    ...THEME_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...THEME_PIPES,
    ...THEME_DIRECTIVES,
    ...THEME_COMPONENTS
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ThemeModule,
      providers: [
        ...THEME_SERVICES
      ],
    };
  }
}
