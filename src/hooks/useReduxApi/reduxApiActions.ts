import {ApiStatus} from "#/hooks/useApi";

export enum ReduxApiActionType {
  changeReduxApiState = 'changeReduxApiState',
}

export const changeReduxApiState = (id: string, status: ApiStatus, error: any = null) => {
  return {
    type: ReduxApiActionType.changeReduxApiState as ReduxApiActionType.changeReduxApiState,
    id,
    state: {
      status,
      error,
    },
  }
};

export type ReduxApiAction = ReturnType<typeof changeReduxApiState>;
