import {ReduxState} from "#/types/ReduxState";
import {ApiStatus} from "#/hooks/useApi";

export const getReduxApiState = (name: string) => ({reduxApi}: ReduxState) => reduxApi[name] || {
  status: ApiStatus.initial,
  error: null,
};