import {useEffect, useMemo, useState} from "react";

export enum ApiStatus {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  failed = 'failed',
  canceled = 'canceled',
}

export interface ApiState {
  resetValue(): void,
  cancelRequest(): void,
  status: ApiStatus,
  error: any | null, // Set error type isn't save. Response from failed api request may be have not expected format
  isInitial: boolean,
  isLoading: boolean,
  isCanceled: boolean,
  isSuccess: boolean,
  isFailed: boolean,
}

type State<TResult> = {
  result: TResult,
  status: ApiStatus,
  error: any
};

export type UseApi = <TRequest, TResponse>(
  asyncFunc: (arg: TRequest) => Promise<TResponse>,
  initialValue: TResponse,
) => [TResponse, (payload: TRequest) => void, ApiState];

const useApi: UseApi = <TRequest, TResponse>(
  asyncFunc: (payload: TRequest) => Promise<TResponse>,
  initialResult: TResponse,
): [TResponse, (payload: TRequest) => void, ApiState] => {
  const [state, setState] = useState<State<TResponse>>({
    result: initialResult,
    status: ApiStatus.initial,
    error: null
  });

  useEffect(() => {
    return () => setState({ ...state, status: ApiStatus.canceled, error: null });
  }, []);

  const request = (payload: TRequest) => {
    setState({ ...state, status: ApiStatus.loading, error: null });

    asyncFunc(payload)
      .then((result) => {
        // Was the validation request canceled at run time?
        if (state.status !== ApiStatus.canceled) {
          setState({ result, status: ApiStatus.success, error: null });
        }
      })
      .catch((error) => {
        // Was the validation request canceled at run time?
        if (state.status === ApiStatus.canceled) {
          return;
        }
        console.error('API error', error);
        setState({ ...state, status: ApiStatus.failed, error });
      });
  };

  const resultState = useMemo((): ApiState => {
    return {
      cancelRequest: () => setState({
        ...state,
        status: ApiStatus.canceled,
        error: null
      }),
      resetValue: () => setState({
        result: initialResult,
        status: ApiStatus.initial,
        error: null
      }),
      error: state.error,
      status: state.status,
      isInitial: state.status === ApiStatus.initial,
      isLoading: state.status === ApiStatus.loading,
      isFailed: state.status === ApiStatus.failed,
      isCanceled: state.status === ApiStatus.canceled,
      isSuccess: state.status === ApiStatus.success,
    };
  }, [state]);

  return [state.result, request, resultState];
};

export default useApi;
