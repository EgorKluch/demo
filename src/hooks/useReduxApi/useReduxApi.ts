import {useEffect, useMemo} from "react";
import {ApiState, ApiStatus} from "#/hooks/useApi";
import {ReduxState} from "#/types/ReduxState";
import useSelector from "#/hooks/useSelector";
import {getReduxApiState} from "#/hooks/useReduxApi/reduxApiSelectors";
import useDispatch from "#/hooks/useDispatch";
import {changeReduxApiState} from "#/hooks/useReduxApi/reduxApiActions";

export type UseReduxApi = <TRequest, TResponse>(
  id: string,
  asyncFunc: (arg: TRequest) => Promise<void>,
  getValue: (state: ReduxState) => TResponse,
) => [TResponse, (payload: TRequest) => void, ApiState];

const useReduxApi: UseReduxApi = <TRequest, TResponse>(
  id: string,
  asyncFunc: (payload: TRequest) => Promise<void>,
  getValue: (state: ReduxState) => TResponse,
): [TResponse, (payload: TRequest) => void, ApiState] => {
    const result = useSelector(getValue);
    const state = useSelector(getReduxApiState(id));
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(changeReduxApiState(id, ApiStatus.canceled));
        };
    }, []);

    const request = (payload: TRequest) => {
        dispatch(changeReduxApiState(id, ApiStatus.loading));

        asyncFunc(payload)
          .then(() => {
              // Was the validation request canceled at run time?
              if (state.status !== ApiStatus.canceled) {
                  dispatch(changeReduxApiState(id, ApiStatus.success));
              }
          })
          .catch((error) => {
              // Was the validation request canceled at run time?
              if (state.status === ApiStatus.canceled) {
                  return;
              }
              console.error('API error', error);
              dispatch(changeReduxApiState(id, ApiStatus.failed, error));
          });
    };

    const resultState = useMemo((): ApiState => {
        return {
            cancelRequest: () => dispatch(changeReduxApiState(id, ApiStatus.canceled)),
            resetValue: () => dispatch(changeReduxApiState(id, ApiStatus.initial)),
            error: state.error,
            status: state.status,
            isInitial: state.status === ApiStatus.initial,
            isLoading: state.status === ApiStatus.loading,
            isFailed: state.status === ApiStatus.failed,
            isCanceled: state.status === ApiStatus.canceled,
            isSuccess: state.status === ApiStatus.success,
        };
    }, [state]);

    return [result, request, resultState];
};

export default useReduxApi;
