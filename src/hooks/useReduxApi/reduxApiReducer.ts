import {ApiState, ApiStatus} from "#/hooks/useApi";
import {ReduxApiActionType} from "#/hooks/useReduxApi/reduxApiActions";
import {ReduxAction} from "#/types/ReduxAction";

type ReduxApiState = { [id: string]: { status: ApiStatus, error: any } };

const initialState: ReduxApiState = {};

const reduxApiReducer = (state = initialState, action: ReduxAction): ReduxApiState => {
  switch (action.type) {
    case ReduxApiActionType.changeReduxApiState:
      return {
        ...state,
        [action.id]: action.state,
      };
    default:
      return state;
  }
};

export default reduxApiReducer;
