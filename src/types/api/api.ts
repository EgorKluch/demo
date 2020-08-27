export type ApiError<TData = any> = any;

export type ApiResponse<TSuccess, TError = ApiError> =
  ({ status: 'success', data: TSuccess }) |
  ({ status: 'error', data: TError | ApiError });
