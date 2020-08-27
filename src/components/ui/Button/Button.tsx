import React, {FC} from 'react';
import {createCn} from 'bem-react-classname';
import './Button.scss';
import cx from 'classnames';
import Spinner from "#/components/ui/Spinner/Spinner";

const cn = createCn('Button');

type ButtonViewProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string,
  isActive?: boolean,
  isHover?: boolean,
  disabled?: boolean,
  isLoading?: boolean,
};

export const ButtonView: FC<ButtonViewProps> = (props) => {
  const className = cx(cn({
    active: Boolean(props.isActive),
    hover: Boolean(props.isHover),
  }), props.className);

  return (
    <button
      onClick={props.onClick}
      className={className}
      disabled={props.disabled || props.isLoading}
    >
      {props.isLoading ? <Spinner className={cn('spinner')}/> : null}
      {props.children}
    </button>
  );
};

export type ButtonProps = Omit<ButtonViewProps, 'isActive' | 'isHover'>;

const Button: FC<ButtonProps> = (props) => {
  return (<ButtonView {...props} />)
};

export default Button;
