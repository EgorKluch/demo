import React, {FC} from 'react';
import {createCn} from 'bem-react-classname';
import './Spinner.scss';
import cx from 'classnames';

const cn = createCn('Spinner');

type Props = {
  className?: string,
};

const Spinner: FC<Props> = (props) => {
  return (
    <div className={cx(cn(), props.className)}/>
  );
};

export default Spinner;
