/**
 * Created by phuongho on 10/14/16.
 */
export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const AUTHORIZATION = {
  TYPE: 'Authorization',
  METHOD: 'Bearer'
};

export const SESSION = {
  FIREBASE_TOKEN_KEYWORD: 'firebase_token',
  TOKEN_KEYWORD: 'token',
  PROFILE_KEYWORD: 'profile',
  LANGUAGE_KEYWORD: 'language',
  NEXT_URL_KEYWORD: 'nextUrl',
  PREV_URL_KEYWORD: 'prevUrl'
};

export const ERROR_CODE = {
  AUTHENTICATION: {
    GENERIC: 1100,
    VIOLATE_RFC6750: 1101,
    TOKEN_NOT_FOUND_CODE: 1102,
    NOT_AUTHORIZED_CODE: 1103,
    NOT_PERMISSION_ACCESS_CODE: 1104,
    WRONG_USER_OR_PASSWORD_CODE: 1105,
    INVALID_ACCESS_TOKEN_CODE: 1106,
    TOKEN_EXPIRED_CODE: 1107,
  }
};

export const PAGINATION = {
  MAX_SIZE: 5,
  ITEMS_PER_PAGE: 10,
  PAGE_ITEM_SIZE: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100]
};

export const HEADERS = {
  TOTAL_ITEMS: 'Total',
  ITEM_PER_PAGE: 'Item-Per-Page',
  CONTENT_DISPOSITION: 'Content-Disposition',
  CONTENT_TYPE: 'Content-Type',
  STATUS_CODE_SUCCESS: 200,
  DEVIDE_OS: 'device-os',
  APP_VERSION: 'app-version',
};

export const HTTP = {
  METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  CONTENT_TYPE: {
    JSON: 'application/json; charset=utf-8'
  },
  HEADER: {
    DEVIDE_OS: 'webPortal',
    APP_VERSION: '1.0.0',
  }
};
export const REST_API = {
  SITE: {
    LOGIN: `auth/login`,
    REGISTER: `users/register`,
    FORGOT_PASSWORD: `users/forgotpassword`,
    RESET_PASSWORD: `users/resetpassword`,
    LOGOUT: `users/logout`
  },
  USER: {
    LIST: `users`,
    CREATE: `users`,
    DELETE: `users`,
    UPDATE: `users`,
    DETAIL: `users`
  },
  ME: {
    PROFILE: `me`,
    CHANGE_PASSWORD: `me/password`,
    FIREBASE_TOKEN: `auth/firebase`
  },
  ROLE: {
    LIST: `roles`,
    CREATE: `roles`,
    DELETE: `roles`,
    UPDATE: `roles`,
    DETAIL: `roles`
  },
  PROVINCE: {
    LIST: `province`,
    CREATE: `province`,
    DELETE: `province`,
    UPDATE: `province`,
    DETAIL: `province`
  },
  PROVINCE_STATE: {
    LIST: `state`,
    CREATE: `state`,
    DELETE: `state`,
    UPDATE: `state`,
    DETAIL: `state`
  },
  COUNTRY: {
    LIST: `country`,
    STATES: `country/states`,
    PROVINCE: `country/provinces`,
    CREATE: `country`,
    DELETE: `country`,
    UPDATE: `country`,
    DETAIL: `country`
  },
  TAGS: {
    LIST: `tags`,
    CREATE: `tags`,
    DELETE: `tags`,
    UPDATE: `tags`,
    DETAIL: `tags`
  },
  PRESENTATION: {
    LIST: `presentations`,
    CREATE: `presentations`,
    DELETE: `presentations`,
    UPDATE: `presentations`,
    DETAIL: `presentations`,
    ASSIGN: `presentations/assign`,
    ASSIGN_DETAIL: `presentations/assign`,
  },
  ARTICLES: {
    LIST: `articles`,
    CREATE: `articles`,
    DELETE: `articles`,
    UPDATE: `articles`,
    DETAIL: `articles`
  },
  COMMENT: {
    LIST: `comment`,
    CREATE: `comment`,
    DELETE: `comment`,
    UPDATE: `comment`,
    DETAIL: `comment`
  },
  CATEGORY: {
    LIST: `category`,
    CREATE: `category`,
    DELETE: `category`,
    UPDATE: `category`,
  },
  LANGUAGES: {
    LIST: `languages`,
    CREATE: `languages`,
    DELETE: `languages`,
    UPDATE: `languages`,
  },
  ACCOUNT_TYPE: {
    LIST: `roles/accounttypes`
  },
  MEDIA: ``,
  FILE: `media/files`,
  VARIABLE: {
    LIST: `variable`
  }
};

export const MAX_SIZE_UPLOAD = 5; // 5 MB

export const IMAGE_EXTENSION = 'jpg|jpeg|png|JPG|JPEG|PNG';
export const DOCUMENT_EXTENSION = 'pdf|PDF';
export const FILE_EXTENSION = 'csv';
export const ZIP_EXTENSION = 'zip';
export const MAX_TITLE = 255;
export const MAX_DESC = 2500;
export const MAX_LENGTH_PHONE = 11;
export const MAX_LENGTH_NUMBER = 255;
export const MAX_LENGTH_PASSWORD = 255;

export const MOMENT_DATE_FORMAT = {
  YYYY_MM_DD: 'YYYY-MM-DD',
  DD_MMM_YY: 'DD MMM YY',
  DD_MMM_YY_H_m: 'DD MMM YY H:m',
  MM_DD_YYYY: 'MM-DD-YYYY',
  DD_MM_YYYY: 'DD-MM-YYYY',
  YYYY_MM_DD_H_m: 'YYYY-MM-DD H:m',
  MM_DD_YYYY_H_m: 'MM-DD-YYYY H:m',
  DD_MM_YYYY_H_m: 'DD-MM-YYYY H:m',
  DD_MMMM_YYYY_hh_mm_A: 'DD MMMM YYYY, hh:mm A',
  HH_MM: 'HH:mm',
  h_mm_a: 'h:mm A',
  MM_YYYY: 'MMM-YYYY',
};

export const TIME_ZONE = {
  TIME_ZONE_DEFAULT: 'Asia/Singapore',
  TIME_ZONE_UTC: 'UTC'
};

export const TIME_OUT_REDIRECT = 2000;
export const TIME_OUT_LOGOUT_FIREBASE = 5000; // 1'

export const ROLE = {
  SYSTEM_ADMIN: 'system_admin',
  COMPANY_ADMIN:'company_admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  PRESENTER: 'presenter'
};

export const BOOKING_TYPE = {
  USER: 'user',
  ADMIN: 'admin'
};

export const LANGUAGE = {
  ENGLISH: 'en',
  VIETNAM: 'vi',
};

export const HTTP_CONNNECTION_TIMEOUT = 300000; // 5 minutes

export const MESSAGE_INFO = {
  MI_HTTP_CONNNECTION_TIMEOUT: 'Connection is timeout exceeded',
  MI_CHAT_SESSION_STOP: 'The chat session has been stopped',
};

export const DATETIMEPICKER_FORMAT = {
  YYYY_MM_DD: 'Y-m-d',
  MM_DD_YYYY: 'm-d-Y',
  DD_MMM_YY: 'd-M-y',
  DD_MMM_YY_H_i: 'd-M-y H:i',
  DD_MM_YYYY: 'd-m-Y',
  YYYY_MM_DD_H_m: 'Y-m-d H:m',
  MM_DD_YYYY_H_m: 'm-d-Y H:m',
  DD_MM_YYYY_H_m: 'd-m-Y H:m',
  HH_MM_SSS: 'H:i',
  DD_MMM: 'd-M',
  MMM_YYYY: 'M-Y',
};

export const DATEPICKER_FORMAT = {
  MMM_YYYY: 'M-yyyy',
};

export const IMAGE_DEFAULT_PATH = {
  AVATAR: 'https://d2rursl26u6zer.cloudfront.net/e35d33c1/7773/4192/9911/103fcd127312/original.png',
  CONDO: 'https://d2rursl26u6zer.cloudfront.net/e35d33c1/7773/4192/9911/103fcd127312/original.png',
  CHAT_IMAGE: 'https://d2rursl26u6zer.cloudfront.net/e35d33c1/7773/4192/9911/103fcd127312/original.png',
};

export const AVATAR_DEFAULT = 'assets/images/avatar_default.png';
export const STATE_EVENT = {
  MENU_COLLAPSED: 'menu.isCollapsed',
  UPDATE_PROFILE: 'updateProfile',
  LOGOUT: 'logout',
};


export const SORT_TYPES = {
  ASC: 'ASC',
  DESC: 'DESC'
};
export const SPINNER_DELAY_TIME = 0; // milisecond
export const INPUT_MAXLENGTH = 255; // characters

export const hardCode = false; // hard code default value
export const COUNTRY_VIET_NAME = "vn"; // 5 MB

export const IMAGE_SIZES = {
  PHONE_REVIEW: {
    width: 245,
    height: 200,
    mode: 'fill'
  },
  FEEDBACK: {
    width: 200,
    height: 300,
    mode: 'fill'
  },
  ICON_REVIEW: {
    width: 145,
    height: 100,
    mode: 'fill'
  },
  UNIT_LOG: {
    width: 40,
    height: 40,
    mode: 'fill'
  },
  UNIT_LOG_EDIT_USER: {
    width: 100,
    height: 100,
    mode: 'fill'
  },
  UNIT_LOG_EDIT_PROOF: {
    width: 100,
    height: 100,
    mode: 'fill'
  },
  SIDEBAR_AVATAR: {
    width: 57,
    height: 57,
    mode: 'fill'
  },
  CHANGE_AVATAR: {
    width: 150,
    height: 150,
    mode: 'fill'
  }
};
