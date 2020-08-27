import {ServerFieldModel, ServerFormModel} from "#/components/common/Form/formTypes";
import _ from 'lodash';

const formatFormValues = <TValues>(form: ServerFormModel<TValues>, values: { [fieldName in keyof TValues]: any }): TValues => {
  return _.reduce(values, (formValues, value, fieldName) => {
    const field: ServerFieldModel = form.fields[fieldName as keyof TValues];
    return {
      ...formValues,
      [fieldName]: [
        (field.format || _.identity),
        ((field.backend && field.backend.format) || _.identity)
      ].reduce((value, format) => format(value, fieldName), value)
    };
  }, {} as any)
};

export default formatFormValues;
