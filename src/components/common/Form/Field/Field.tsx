import React, {FC} from "react";
import {FieldModel, FieldType} from "#/components/common/Form/formTypes";
import InputField from "#/components/common/Form/Field/InputField";
import useField from "#/components/common/Form/hooks/useField";
import useForm from "#/components/common/Form/hooks/useForm";

type CommonProps = {
  name: string,
}

type Props = CommonProps & Partial<FieldModel>;

const Field: FC<Props> = (props) => {
  const form = useForm();
  const field = useField<any>(props.name);

  if (!field || !form) {
    return null;
  }

  const commonProps = {
    readonly: form.getState().submitting,
  };

  switch (field.type) {
    case FieldType.input:
      return (
        <InputField
          {...commonProps}
          {...field}
          {...props}
          validate={(...args) => {
            const validate = field.validate || props.validate;
            if (!validate) {
              return null;
            }
            return validate(...args);
          }}
        />
      );
    default:
      console.error('Unknown field', field);
      return null;
  }
};

export default Field;
