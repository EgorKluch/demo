import React, {FC} from 'react';
import { IntlProvider } from 'react-intl';
import {getIntlLocale, getIntlMessages} from "#/redux/intl/intlSelectors";
import useSelector from "#/hooks/useSelector";

const ConnectedIntlProvider: FC = (props) => {
  const locale = useSelector(getIntlLocale);
  const messages = useSelector(getIntlMessages);

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      onError={(err) => {
        if (err && err.code === 'MISSING_TRANSLATION') {
          console.log('%c @@INTL@@: Missing translation', [
            'background: #FFDD57',
            'color: #000',
          ].join(';'));
          return;
        }
        throw err;
      }}
    >
      {props.children}
    </IntlProvider>
  );
};

export default ConnectedIntlProvider;
