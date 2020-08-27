import errorMessages from "#/intl/errorMessages";

const maxLength = (max: number) => (value: string | any[]) => {
  if (value && value.length > max) {
    return { ...errorMessages.maxLength, values: {max} };
  }

  return null;
};

export default maxLength;
