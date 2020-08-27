import {Locale} from "#/types/common";

export enum IntlActionType {
  setIntlLocale = 'setIntlLocale',
  setIntlMessages = 'setIntlMessages'
}

export const changeIntlLocale = (locale: Locale) => {
  return {
    type: IntlActionType.setIntlLocale as IntlActionType.setIntlLocale,
    locale
  };
};

export const setIntlMessages = (locale: Locale, messages: Record<string, string>) => {
  return {
    type: IntlActionType.setIntlMessages as IntlActionType.setIntlMessages,
    messages,
    locale,
  };
};

export type IntlAction =
  ReturnType<typeof changeIntlLocale> |
  ReturnType<typeof setIntlMessages>;
