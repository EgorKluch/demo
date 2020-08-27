const isValidationError = (err: any) => {
  if (!err || err.status !== 'error' || !err.data) {
    return false;
  }

  return err.data.code === 'validationError';
};

export default isValidationError;
