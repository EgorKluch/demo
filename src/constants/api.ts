import {Locale} from "#/types/common";

const api = {
  users: {
    login: () => '/api/login',
    logout: () => '/api/logout',
    getIntlMessages: (locale: Locale) => `/intl/${locale}.json`,
  }
};

export default api;
