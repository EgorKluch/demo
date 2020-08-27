import React, {FC, useMemo} from "react";
import Input from "#/components/ui/Input";
import {InputProps} from "#/components/ui/Input/Input";
import {Field, FieldRenderProps, UseFieldConfig} from "react-final-form";
import {FieldValidator} from "final-form";
import {useIntl} from "react-intl";

type Value = string;

type Props = Omit<InputProps, 'name' | 'onChange' | 'value' | 'dirty' | 'touched' | 'error'>
  & Omit<UseFieldConfig<Value>, 'render'>
  & {
  name: string,
};

const InputControl = (props: FieldRenderProps<Value>) => {
  const { meta, input } = props;
  const intl = useIntl();
  const msg = intl.formatMessage;

  const error = useMemo(() => {
    if (meta.error && meta.dirty) {
      return msg(meta.error, meta.error.values);
    }
    if (meta.submitError && !meta.dirtySinceLastSubmit) {
      return msg(meta.submitError, meta.submitError.values);
    }
    return null;
  }, [meta.error || meta.submitError, meta.dirty, meta.dirtySinceLastSubmit, intl.locale]);

  return (
    <Input
      {...props}
      {...input}
      touched={meta.touched}
      dirty={meta.dirty}
      error={error}
    />
  );
};

const InputField: FC<Props> = (props) => {
  return (
    <Field
      {...props}
      initialValue={props.initialValue == null ? '' : props.initialValue}
      render={InputControl}
    />
  )
};

export default InputField;
