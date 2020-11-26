import React, { FC, memo } from 'react';
import ReactTextMask from 'react-text-mask';
import { FormTextInputPropsType } from '@/_components/inputs/form-text-input';

type PropsType = {
  mask: Array<RegExp | string>;
  inputComponent: FC<FormTextInputPropsType>;
  inputRef: (input: any) => void;
  pipe?: (
    conformedValue: string,
    config: any,
  ) => false | string | { value: string; indexesOfPipedChars: number[] };
} & FormTextInputPropsType;

export const MaskedInput = memo(
  ({
    mask,
    placeholder,
    meta,
    label,
    dataFind,
    input: { onChange, onBlur, onFocus },
    isDisabled,
    withoutHelperText,
    externalErrorText,
    readOnly,
    inputType,
    isRequired,
    autoComplete,
    classname,
    inputComponent: Input,
    pipe,
    inputRef,
  }: PropsType) => (
    <ReactTextMask
      ref={(input) => inputRef(input)}
      guide={false}
      mask={mask}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      pipe={pipe}
      render={(ref, inputMaskParams) => {
        return (
          <Input
            autoComplete={autoComplete}
            classname={classname}
            dataFind={dataFind}
            externalErrorText={externalErrorText}
            // eslint-disable-next-line
            // @ts-ignore
            input={{
              onChange: inputMaskParams.onChange,
              name: inputMaskParams.name,
              onBlur: inputMaskParams.onBlur,
              onFocus: inputMaskParams.onFocus,
            }}
            // eslint-disable-next-line
            // @ts-ignore 
            inputRef={ref}
            inputType={inputType}
            isDisabled={isDisabled}
            isRequired={isRequired}
            label={label}
            meta={meta}
            placeholder={placeholder}
            readOnly={readOnly}
            withoutHelperText={withoutHelperText}
          />
        );
      }}
    />
  ),
);
