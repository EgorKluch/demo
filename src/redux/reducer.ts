import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import history from "#/history";
import intlReducer from "#/redux/intl/intlReducer";
import userReducer from "#/api/user/userReducer";
import reduxApiReducer from "#/hooks/useReduxApi/reduxApiReducer";

const reducer = combineReducers({
  router: connectRouter(history),
  user: userReducer,
  intl: intlReducer,
  reduxApi: reduxApiReducer,
});

export default reducer;
