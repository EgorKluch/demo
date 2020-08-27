import {FieldProps, FormProps} from "react-final-form";
import {FieldState, FieldValidator, FormApi} from "final-form";

export enum FieldType {
  input = 'input'
}

type BaseFieldModel<TValue> = {
  validate?: FieldValidator<TValue>,
  format?(value: TValue, name: string): any,
  parse?(value: any, name: string): TValue,
  className?: string,
};

export type InputFieldModel = BaseFieldModel<string> & {
  type: FieldType.input,
  label?: string,
}

export type FieldModel = InputFieldModel;

export type ServerFieldModel = FieldModel & {
  backend?: {
    format?(value: any, name: string): any,
    parse?(value: any, name: string): any,
  }
}

export type ServerFormModel<TValues> = {
  fields: Record<keyof TValues, ServerFieldModel>
}

export type FormModel<TValues> = ServerFormModel<TValues> & {
  fields: Record<keyof TValues, FieldModel>,
  onSubmit: FormProps<TValues>['onSubmit'],
};

export type FormErrors<TValues> = { [key in keyof TValues]: string };

export type Form<TValues> = FormApi<TValues> & {
  model: FormModel<TValues>,
  submitSuccess(): void,
  submitFailed(errors: FormErrors<TValues>): void,
}
