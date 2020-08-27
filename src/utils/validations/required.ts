import errorMessages from "#/intl/errorMessages";

const required = () => (value: string | number) => {
  if (!value && typeof value !== 'number') return errorMessages.required;
  if (typeof value === 'string' && !value.replace(/\s/g, '')) {
    return errorMessages.required;
  }
  return null;
};

export default required;
