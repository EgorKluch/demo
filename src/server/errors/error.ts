export function error<TData>(code: string, data?: TData) {
  return { ...data, code };
}
