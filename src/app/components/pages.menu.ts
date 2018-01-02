import {ROLE} from '../modules/constants';
export const PAGES_MENU = [
  {
    url: ['admin', 'dashboard'],
    data: {
      menu: {
        title: 'Dashboard',
        icon: 'fa-home',
        selected: true,
        expanded: false,
        group: false,
        order: 0,
        target: '_self',
        privileges: [ROLE.SYSTEM_ADMIN, ROLE.MANAGER],
      }
    }
  },
  {
    url: ['admin', 'users'],
    data: {
      menu: {
        title: 'Users',
        icon: 'fa-user',
        selected: false,
        expanded: false,
        group: false,
        order: 0,
        target: '_self',
        privileges: [ROLE.SYSTEM_ADMIN, ROLE.COMPANY_ADMIN, ROLE.MANAGER]
      }
    }
  },
  {
    url: ['admin', 'articles'],
    data: {
      menu: {
        title: 'Articles',
        icon: 'fa-newspaper-o',
        selected: false,
        expanded: false,
        group: false,
        order: 0,
        target: '_self',
        privileges: [ROLE.SYSTEM_ADMIN, ROLE.COMPANY_ADMIN, ROLE.MANAGER]
      }
    }
  },
  {
    url: ['admin', 'comments'],
    data: {
      menu: {
        title: 'Comments',
        icon: 'fa-comments-o',
        selected: false,
        expanded: false,
        group: false,
        order: 0,
        target: '_self',
        privileges: [ROLE.SYSTEM_ADMIN, ROLE.COMPANY_ADMIN, ROLE.MANAGER]
      }
    }
  },
  {
    url: ['admin', 'category'],
    data: {
      menu: {
        title: 'Category',
        icon: 'fa-bars',
        selected: false,
        expanded: false,
        group: false,
        order: 0,
        target: '_self',
        privileges: [ROLE.SYSTEM_ADMIN, ROLE.COMPANY_ADMIN, ROLE.MANAGER]
      }
    }
  },
];
