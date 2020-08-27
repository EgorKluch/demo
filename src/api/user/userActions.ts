import {User} from "#/types/api/userApi";

export enum UserActionType {
  setCurrentUser = 'setCurrentUser',
}

export const setCurrentUser = (user: User | null) => {
  return {
    type: UserActionType.setCurrentUser as UserActionType.setCurrentUser,
    user
  };
};

export type UserAction =
  ReturnType<typeof setCurrentUser>;
