import {applyMiddleware, createStore, Store} from 'redux';
import reducer from './reducer';
import { routerMiddleware } from 'connected-react-router'
import history from "#/history";
import {ReduxState} from "#/types/ReduxState";
import {ReduxAction} from "#/types/ReduxAction";

const middleware = applyMiddleware(
  routerMiddleware(history),
);

const getInitialState = () => {
  if (process.env.SSR) {
    return undefined;
  }

  return (window as any).__STATE__;
};

const store: Store<ReduxState, ReduxAction> = createStore(reducer, getInitialState(), middleware) as any;

export default store;
