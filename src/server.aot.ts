/* tslint:disable no-console */
const compression = require('compression');
import 'zone.js/dist/zone-node';
import './polyfills.server';
import './rxjs.imports';
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModuleNgFactory } from './ngfactory/app/server.app.module.ngfactory';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { routes } from './server.routes';
import { enableProdMode } from '@angular/core';
import { UNIVERSAL_PORT } from '../constants';
enableProdMode();
const app = express();
const baseUrl = `http://localhost:${UNIVERSAL_PORT}`;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', '.');

app.use(compression());
app.use('/', express.static('.', { index: false }));
app.use(favicon('./assets/icon/favicon.ico'));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));

app.get('*', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.render('index', {
    req: req,
    res: res
  });
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(UNIVERSAL_PORT, () => {
  console.log(`Listening at ${baseUrl}`);
});
