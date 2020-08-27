import React, {FC, ReactNode} from 'react';
import {Form as FinalForm, FormRenderProps} from 'react-final-form';
import {Form as FormType} from "#/components/common/Form/formTypes";
import {FormApi} from "final-form";
import localValidDecorator from "#/components/common/Form/decorators/localValidDecorator";

function InnerForm<TValues>(props: FormRenderProps<TValues>) {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  )
}

type Props<TValues> = {
  component: FC,
  form: FormType<TValues>,
};

export const formContext = React.createContext<any>(null);
const { Provider } = formContext;

function Form<TValues>(props: Props<TValues>) {
  const { component: Component, form, ...formProps } = props;

  return (
    <Provider value={form}>
      <FinalForm
        form={form}
        onSubmit={form.model.onSubmit}
        decorators={[localValidDecorator]}
        {...formProps}
        render={(renderProps) => {
          return (
            <InnerForm {...renderProps}>
              <Component/>
            </InnerForm>
          );
        }}
      >
      </FinalForm>
    </Provider>
  );
}

export default Form;
