import {FormModel} from "#/components/common/Form/formTypes";

const validateForm = async <TValues>(form: Omit<FormModel<TValues>, 'onSubmit'>, values: TValues) => {
  const fieldNames = Object.keys(form.fields) as Array<keyof TValues>;
  let errors: Partial<Record<keyof TValues, any>> = {};

  for (let i = 0; i < fieldNames.length; i++) {
    const fieldName = fieldNames[i];
    const field = form.fields[fieldName];
    let error = null;
    if (field.validate) {
      error = await field.validate(values[fieldName] as any, values as any);
    }
    if (error) {
      errors[fieldName] = error;
    }
  }

  return Object.keys(errors).length ? errors : null;
};

export default validateForm;
