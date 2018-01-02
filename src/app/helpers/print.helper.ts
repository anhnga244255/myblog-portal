import { PlatformHelper } from './platform.helper';
import * as PHE from 'print-html-element';

export class PrintHelper {

  public printMode: string;
  public pageTitle: string;
  public templateString: string;
  public popupProperties: string = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no';
  public stylesheets: string | string[];
  public styles: string | string[];

  constructor() {

  }

  /**
   * Print By Element Id
   * @param elementId
   */
  public printByElementId(elementId: string = 'printContent') {
    if (PlatformHelper.isPlatformBrowser()) {
      PHE.printElement(document.getElementById(elementId), this.getOptions());
    }
  }

  /**
   * Print Html
   * @param htmlContent
   */
  public printHtml(htmlContent: string) {
    PHE.printHtml(htmlContent, this.getOptions());
  }

  /**
   * Print Options
   * @returns  {}
   */
  public getOptions() {
    return {
      printMode: this.printMode,
      pageTitle: this.pageTitle,
      templateString: this.templateString,
      popupProperties: this.popupProperties,
      stylesheets: this.stylesheets,
      styles: this.styles,
    };
  }
}
