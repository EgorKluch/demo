import {ReduxState} from "#/types/ReduxState";

export const getIntlMessages = (state: ReduxState) => state.intl.messages[state.intl.locale];
export const getIntlLocale = (state: ReduxState) => state.intl.locale;