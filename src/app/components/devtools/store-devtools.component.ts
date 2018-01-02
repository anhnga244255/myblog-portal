import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-store-devtools',
  template: require('../../views/devtools/index.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [`
  md-sidenav-layout {
    width: 70% !important;
  }
  `]
})

export class StoreDevToolsComponent {}
