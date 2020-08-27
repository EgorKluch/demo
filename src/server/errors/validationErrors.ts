import {error} from "./error";

const validationErrors = <TValues>(errors: { [field: string]: any }) => {
  return error('validationError', { errors });
};

export default validationErrors;
