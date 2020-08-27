import errorMessages from "#/intl/errorMessages";

const minLength = (min: number) => (value: string | any[]) => {
  if (!value || value.length < min) {
    return { ...errorMessages.minLength, values: {min} };
  }

  return null;
};

export default minLength;
