import {ReduxState} from "#/types/ReduxState";

export const getCurrentUser = (state: ReduxState) => state.user.currentUser;