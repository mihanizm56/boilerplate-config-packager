import React, { useMemo, memo, FC } from 'react';
import { FieldRenderProps } from 'react-final-form';
import classnames from 'classnames/bind';
import { Text } from '@/_components/text';
import { SimpleInput } from '@/_components/inputs/simple-input-component/simple-input';
import { SimpleInputPropsType } from '@/_components/inputs/simple-input-component/types';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type FinalFormPropsType = FieldRenderProps<string, HTMLInputElement>;

export type FormTextInputPropsType = {
  label: string;
  externalErrorText?: string;
  isRequired?: boolean;
  dataFind?: string;
  withoutHelperText?: boolean;
} & FinalFormPropsType &
  Omit<SimpleInputPropsType, 'onChange' | 'inputValue' | 'name'>;

export const FormTextInput: FC<FormTextInputPropsType> = memo(
  ({
    input: { onChange, value, onBlur, onFocus, name },
    placeholder,
    label,
    meta: { error, modified },
    externalErrorText,
    isDisabled,
    classname,
    isRequired,
    withoutHelperText,
    autoComplete,
    inputType = 'text',
    inputRef,
    dataFind,
  }: FormTextInputPropsType) => {
    const errorTextValue = useMemo(
      () => (modified && error) || externalErrorText,
      [error, externalErrorText, modified],
    );

    return (
      <div className={cn('formTextInputWrapper')}>
        <div className={cn('formTextInputTitleContainer')}>
          <div className={cn('formTextInputLabelContainer')}>
            <Text color="GreyText" text={label} />
            {isRequired && <Text color="Orange" text="*" />}
          </div>
        </div>
        <div className={cn('formTextInputContainer')}>
          <SimpleInput
            autoComplete={autoComplete}
            classname={classname}
            dataFind={dataFind}
            inputRef={inputRef}
            inputType={inputType}
            inputValue={value}
            isDisabled={isDisabled}
            isError={Boolean(errorTextValue)}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
          />
        </div>
        {!withoutHelperText && (
          <div className={cn('formTextInputErrorTextContainer')}>
            <Text color="Violet" text={errorTextValue} />
          </div>
        )}
      </div>
    );
  },
);
