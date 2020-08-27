import {IntlAction} from "#/redux/intl/intlActions";
import {RouterAction} from "connected-react-router";
import {UserAction} from "#/api/user/userActions";
import {ReduxApiAction} from "#/hooks/useReduxApi/reduxApiActions";

export type ReduxAction =
  IntlAction |
  UserAction |
  RouterAction |
  ReduxApiAction;
