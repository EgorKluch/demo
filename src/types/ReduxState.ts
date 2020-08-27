import intlReducer from "#/redux/intl/intlReducer";
import {RouterState} from "connected-react-router";
import userReducer from "#/api/user/userReducer";
import reduxApiReducer from "#/hooks/useReduxApi/reduxApiReducer";

export type ReduxState = {
  router: RouterState,
  user: ReturnType<typeof userReducer>
  intl: ReturnType<typeof intlReducer>,
  reduxApi: ReturnType<typeof reduxApiReducer>,
};
