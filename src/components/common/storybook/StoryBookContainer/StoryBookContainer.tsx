import React, {FC} from "react";
import {createCn} from "bem-react-classname";
import cx from 'classnames';
import './StoryBookContainer.scss';
import {IntlProvider} from "react-intl";
import {Locale} from "#/types/common";

type Props = {
  locale: Locale,
  className?: string,
}

const cn = createCn('StoryBookContainer');

const StoryBookContainer: FC<Props> = (props) => {
    return (
      <div className={cx(cn(), props.className)}>
          <IntlProvider locale='ru'>
              {props.children}
          </IntlProvider>
      </div>
    );
};

export default StoryBookContainer;
