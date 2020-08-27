import React, {FC, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import './Input.scss';
import {createCn} from "bem-react-classname";
import InputMask from 'react-input-mask';

type InputViewProps = {
    onChange(value: string, name: string | null, e: any): void,
    value: string,

    onBlur?(e: any): void,
    onFocus?(e: any): void,
    type?: string,
    className?: string,
    placeholder?: string,
    disabled?: boolean,
    label?: string,
    description?: string,
    regExp?: RegExp,
    isLoading?: boolean,
    prepend?: ReactNode,
    append?: ReactNode,
    name?: string | null,
    touched?: boolean,
    dirty?: boolean,
    showHint?: boolean,
    error?: string | boolean | null,
    isActive?: boolean,
    isHover?: boolean,
    onClick?(e: any): void,
    readonly?: boolean,
    innerRef?: any,
    withoutBorder?: boolean,
    mask?: string,
};

const cn = createCn('Input');

export const InputView: FC<InputViewProps> = (props) => {
    const ref = useRef<HTMLLabelElement | null>(null);

    const [isActive, setIsActive] = useState(false);

    const onChange = useCallback((e: any) => {
        if (!props.onChange) return;

        if (props.regExp && !props.regExp.test(e.currentTarget.value)) {
            return;
        }

        props.onChange(e.currentTarget.value, props.name || null, e);
    }, [props.onChange, props.regExp && props.regExp.toString(), props.name]);

    const mods = {
        error: Boolean(props.error),
        success: Boolean(props.touched && !props.error),
        disabled: Boolean(props.disabled),
        readonly: Boolean(props.readonly),
        active: Boolean(isActive || props.isActive),
        loading: Boolean(props.isLoading),
        hover: Boolean(props.isHover),
        withPrepend: Boolean(props.prepend),
        withBorder: !props.withoutBorder
    };

    const onBlur = useCallback((e: any) => {
        setIsActive(false);
        if (props.onBlur) {
            props.onBlur(e)
        }
    }, [props.onBlur]);

    const onFocus = useCallback((e) => {
        setIsActive(true)
        if (props.onFocus) {
            props.onFocus(e);
        }
    }, [props.onFocus]);

    const controlProps = {
        type: props.type || 'text',
        onBlur,
        onFocus,
        value: props.value,
        placeholder: props.placeholder,
        onChange: onChange,
        disabled: props.disabled || props.readonly,
        className: cn('control')
    };

    return (
        <label className={cx(cn(), props.className)} ref={ref}>
            {
                props.label ? (
                    <div className={cn('label')}>{props.label}</div>
                ) : null
            }

            <div className={cn('container', mods)} onClick={props.onClick} ref={props.innerRef}>
                {props.prepend ? (
                    <div className={cx(cn('prepend'))}>{props.prepend}</div>
                ) : null}

                {props.mask ? (
                    <InputMask {...controlProps} mask={props.mask}/>
                ) : (
                    <input {...controlProps}/>
                )}

                {props.append ? (
                    <div className={cn('append')}>{props.append}</div>
                ) : null}
            </div>

            {props.description ? (
                <div className={cn('description')}>{props.description}</div>
            ) : null}

            {props.error && typeof props.error === 'string' ? (
                <div className={cn('error')}>{props.error}</div>
            ) : null}
        </label>
    );
};

export type InputProps = Omit<InputViewProps, 'isActive' | 'isHover'>;

const Input: FC<InputProps> = (props) => {
    return (<InputView {...props}/>)
};

export default Input;
