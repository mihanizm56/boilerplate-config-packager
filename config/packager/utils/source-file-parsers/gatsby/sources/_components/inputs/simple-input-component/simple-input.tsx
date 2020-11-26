import React, {
  memo,
  SyntheticEvent,
  useCallback,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import classNames from 'classnames/bind';
import { keyCodes } from '@/_components/inputs/simple-input-component/_utils/key-codes';
import styles from './simple-input.module.scss';
import { SimpleInputPropsType } from './types';

const cn = classNames.bind(styles);

export const SimpleInput = memo(
  ({
    classname,
    autoComplete,
    isDisabled,
    inputRef,
    name,
    onBlur = () => false,
    onChange,
    dataFind,
    onClick = () => false,
    onFocus = () => false,
    onKeyPress = () => false,
    placeholder,
    readOnly,
    isError,
    inputType,
    inputValue,
  }: SimpleInputPropsType) => {
    const handleBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        onBlur(event, value, name);
      },
      [onBlur, name],
    );

    const handleChange = useCallback(
      (event: SyntheticEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        onChange(event, value, name);
      },
      [onChange, name],
    );

    const handleClick = useCallback(
      (event: SyntheticEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        onClick(event, value, name);
      },
      [onClick, name],
    );

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;

        onFocus(event, value, name);
      },
      [onFocus, name],
    );

    const handleKeyPress = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        const { currentTarget, keyCode, which } = event;
        const { ENTER } = keyCodes;
        const actionMethod =
          keyCode === ENTER || which === ENTER ? onClick : onKeyPress;

        actionMethod(event, currentTarget.value, name);
      },
      [onClick, onKeyPress, name],
    );

    return (
      <input
        ref={inputRef}
        autoComplete={autoComplete}
        className={cn('SimpleInput', {
          'SimpleInput--disabled': isDisabled,
          [classname]: Boolean(classname),
          'SimpleInput--error': isError,
        })}
        data-component="simple-masked-input"
        data-find={dataFind}
        disabled={isDisabled}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        readOnly={readOnly}
        type={inputType}
        value={inputValue}
      />
    );
  },
);
