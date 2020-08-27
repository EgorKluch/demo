import React, {FC} from "react";
import commonMessages from "#/intl/commonMessages";
import {useIntl} from "react-intl";
import {createCn} from "bem-react-classname";
import Button from "#/components/ui/Button/Button";
import messages from './messages';
import Field from "#/components/common/Form/Field";
import useForm from "#/components/common/Form/hooks/useForm";
import {LoginFormValues} from "#/components/pages/LoginPage/useLoginForm";
import './LoginForm.scss';

const cn = createCn('LoginForm');

const LoginForm: FC = () => {
  const msg = useIntl().formatMessage;
  const form = useForm<LoginFormValues>();

  if (!form) {
    return null;
  }

  const state = form.getState();

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Field
          name='login'
          className={cn('field')}
          label={msg(commonMessages.Login)}
        />
        <Field
          name='password'
          className={cn('field')}
          label={msg(commonMessages.Password)}
        />
        <div className={cn('actions')}>
          <Button
            className={cn('action')}
            isLoading={state.submitting}
            disabled={!state.localValid}
            onClick={() => form.submit()}
          >{msg(messages.DoLogin)}</Button>
        </div>
      </div>
    </div>
  )
};

export default LoginForm;
