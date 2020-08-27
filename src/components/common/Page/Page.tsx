import React, {FC} from 'react';
import {createCn} from 'bem-react-classname';
import './Page.scss';
import LocaleSwitch from "#/components/common/Page/LocaleSwitch/LocaleSwitch";
import cx from 'classnames';

const cn = createCn('Page');

type Props = {
  className?: string,
};

const Page: FC<Props> = (props) => {
  return (
    <div className={cx(cn(), props.className)}>
      <div className={cn('header')}>
        <LocaleSwitch/>
      </div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  );
};

export default Page;
