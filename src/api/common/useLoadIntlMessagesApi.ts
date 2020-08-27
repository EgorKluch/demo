import useApiRequest, {ApiMethod} from "#/hooks/useApiRequest";
import useDispatch from "#/hooks/useDispatch";
import useReduxApi from "#/hooks/useReduxApi/useReduxApi";
import api from "#/constants/api";
import {getIntlMessages} from "#/redux/intl/intlSelectors";
import {Locale} from "#/types/common";
import {setIntlMessages} from "#/redux/intl/intlActions";
import store from "#/redux/store";
import _ from 'lodash';

type ChangeIntlMessagesRequest = {
  locale: Locale,
}

const useLoadIntlMessagesApi = () => {
  const request = useApiRequest();
  const dispatch = useDispatch();

  return useReduxApi<ChangeIntlMessagesRequest, Record<string, string>>('intlMessages', async ({ locale }) => {
    const messages = getIntlMessages(store.getState());
    if (!_.isEmpty(messages)) {
      return;
    }
    const newMessages = await request(ApiMethod.get, api.users.getIntlMessages(locale));
    dispatch(setIntlMessages(locale, newMessages));
  }, getIntlMessages);
};

export default useLoadIntlMessagesApi;
