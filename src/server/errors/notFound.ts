import {error} from "./error";

const notFoundError = <TData>(data?: TData) => {
  return error('notFound', data);
};

export default notFoundError;
