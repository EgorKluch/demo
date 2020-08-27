import React, {FC} from 'react';
import {createCn} from 'bem-react-classname';
import './LoginPage.scss';
import Form from "#/components/common/Form";
import LoginForm from "#/components/pages/LoginPage/LoginForm/LoginForm";
import useLoginForm from "#/components/pages/LoginPage/useLoginForm";
import Page from "#/components/common/Page/Page";

const cn = createCn('LoginPage');

type Props = {};

const LoginPage: FC<Props> = () => {
  const loginForm = useLoginForm();

  return (
    <Page>
      <div className={cn()}>
        <Form
          form={loginForm}
          component={LoginForm}
        />
      </div>
    </Page>
  );
};

export default LoginPage;
