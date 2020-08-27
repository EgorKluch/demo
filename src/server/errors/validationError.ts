import {error} from "./error";

const validationError = <TValues>(field: keyof TValues, err: any) => {
  return error('validationError', { errors: { [field]: err } });
};

export default validationError;
