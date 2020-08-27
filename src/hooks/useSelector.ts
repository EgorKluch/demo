import {useSelector as useNativeSelector} from 'react-redux';
import {ReduxState} from "#/types/ReduxState";

const useSelector = <TResult, TArgs extends any[] = []>(
  selector: (state: ReduxState, ...args: TArgs) => TResult,
  ...options: TArgs
): TResult => {
  let args = options;
  let equalityFn: ((left: TResult, right: TResult) => boolean) | undefined = undefined;
  if (args.length && typeof args[args.length - 1] === 'function') {
    equalityFn = args.pop();
  }

  return useNativeSelector((state: ReduxState) => {
    return selector(state, ...args);
  }, equalityFn);
};

export default useSelector;
