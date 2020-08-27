import {Locale} from "#/types/common";
import {IntlAction, IntlActionType} from "#/redux/intl/intlActions";

type IntlState = {
  locale: Locale,
  messages: Record<Locale, Record<string, string>>
}

const initialState: IntlState = {
  locale: Locale.ru,
  messages: {
    [Locale.ru]: {},
    [Locale.en]: {}
  }
};

const intlReducer = (state: IntlState = initialState, action: IntlAction): IntlState => {
  switch (action.type) {
    case IntlActionType.setIntlLocale:
      return {...state, locale: action.locale};

    case IntlActionType.setIntlMessages:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.locale]: action.messages,
        }
      };

    default:
      return state;
  }
};

export default intlReducer;
