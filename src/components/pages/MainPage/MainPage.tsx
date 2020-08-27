import React, {FC} from "react";
import withAuth from "#/hocs/withAuth";
import Button from "#/components/ui/Button/Button";
import useLogoutApi from "#/api/user/useLogoutApi";
import {useIntl} from "react-intl";
import commonMessages from "#/intl/commonMessages";
import {createCn} from "bem-react-classname";
import './MainPage.scss';
import Page from "#/components/common/Page/Page";

const cn = createCn('MainPage');

const MainPage: FC = () => {
  const [, logout] = useLogoutApi();
  const msg = useIntl().formatMessage;

  return (
    <Page>
      <div className={cn()}>
        <div className={cn('content')}>
          <h1>Hello world!</h1>
          <Button onClick={() => logout()}>
            {msg(commonMessages.Logout)}
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default withAuth()(MainPage);
