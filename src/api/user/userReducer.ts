import {User} from "#/types/api/userApi";
import {ReduxAction} from "#/types/ReduxAction";
import {UserActionType} from "#/api/user/userActions";

type UserState = {
  currentUser: User | null,
}

const initialState: UserState = {
  currentUser: null
};

const userReducer = (state: UserState = initialState, action: ReduxAction): UserState => {
  switch (action.type) {
    case UserActionType.setCurrentUser:
      return { ...state, currentUser: action.user };
    default:
      return state;
  }
};

export default userReducer;