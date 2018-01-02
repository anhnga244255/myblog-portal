# @ngx-config/http-loader
Loader for [@ngx-config/core] that provides application settings using **`http`**

[![Linux build](https://travis-ci.org/ngx-config/http-loader.svg?branch=master)](https://travis-ci.org/ngx-config/http-loader) [![Windows build](https://ci.appveyor.com/api/projects/status/github/ngx-config/http-loader?branch=master&svg=true)](https://ci.appveyor.com/project/ngx-config/http-loader) [![coverage](https://codecov.io/github/ngx-config/http-loader/coverage.svg?branch=master)](https://codecov.io/gh/ngx-config/http-loader) [![npm version](https://badge.fury.io/js/%40ngx-config%2Fhttp-loader.svg)](https://www.npmjs.com/package/@ngx-config/http-loader)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Adding `@ngx-config/http-loader` to your project (SystemJS)](#adding-ngx-confighttp-loader-to-your-project-systemjs)
- [Settings](#settings)
	- [Setting up `ConfigModule` to use `ConfigHttpLoader`](#setting-up-configmodule-to-use-confighttploader)
- [License](#license)

## Prerequisites
This package depends on `@angular v2.0.0` but it's highly recommended that you are running at least **`@angular v2.4.0`** and **`@angular/router v3.4.0`**. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.1.6`** or higher.

## Getting started
### Installation
You can install **`@ngx-config/http-loader`** using `npm`
```
npm install @ngx-config/http-loader --save
```

**Note**: You should have already installed [@ngx-config/core].

### Examples
- [ng-seed/universal] and [ng-seed/spa] are officially maintained seed projects, showcasing common patterns and best practices for **`@ngx-config/http-loader`**.

### Related packages
The following packages may be used in conjunction with **`@ngx-config/http-loader`**:
- [@ngx-config/core]
- [@ngx-universal/config-loader]
- [@ngx-config/merge-loader]

### Adding `@ngx-config/http-loader` to your project (SystemJS)
Add `map` for **`@ngx-config/http-loader`** in your `systemjs.config`
```javascript
'@ngx-config/http-loader': 'node_modules/@ngx-config/http-loader/bundles/http-loader.umd.min.js'
```

## Settings
### Setting up `ConfigModule` to use `ConfigHttpLoader`
If you provide application settings using a `JSON` file or an `API`, you can call the [forRoot] static method using the `ConfigHttpLoader`. By default, it is configured to retrieve **application settings** from the endpoint `/config.json` (*if not specified*).

> You can customize this behavior (*and ofc other settings*) by supplying a **api endpoint** to `ConfigHttpLoader`.

- Import `ConfigModule` using the mapping `'@ngx-config/core'` and append `ConfigModule.forRoot({...})` within the imports property of **app.module**.
- Import `ConfigHttpLoader` using the mapping `'@ngx-config/http-loader'`.

**Note**: *Considering the app.module is the core module in Angular application*.

#### config.json
```json
{
  "system": {
    "applicationName": "Mighty Mouse",
    "applicationUrl": "http://localhost:8000"
  },
  "seo": {
    "pageTitle": "Tweeting bird"
  },
  "i18n":{
    "locale": "en"
  }
}
```

#### app.module.ts
```TypeScript
...
import { Http } from '@angular/http';
import { ConfigModule, ConfigLoader,  } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
...

export function configFactory(http: Http): ConfigLoader {
  return new ConfigHttpLoader(http, './config.json'); // API ENDPOINT
}

@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: (configFactory),
      deps: [Http]
    }),
    ...
  ],
  bootstrap: [AppComponent]
})
```

`ConfigHttpLoader` has two parameters:
- **http**: `Http` : Http instance
- **endpoint**: `string` : the `API endpoint`, to retrieve application settings from (*by default, `config.json`*)

> :+1: Well! **`@ngx-config/http-loader`** will now provide **application settings** to [@ngx-config/core] using `http`.

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[@ngx-config/core]: https://github.com/ngx-config/core
[ng-seed/universal]: https://github.com/ng-seed/universal
[ng-seed/spa]: https://github.com/ng-seed/spa
[@ngx-universal/config-loader]: https://github.com/ngx-universal/config-loader
[@ngx-config/merge-loader]: https://github.com/ngx-config/merge-loader
[forRoot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[Burak Tasci]: https://github.com/fulls1z3
