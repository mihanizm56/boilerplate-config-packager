import { RefObject, SyntheticEvent, KeyboardEvent, FocusEvent } from 'react';

export type BlurSimpleInputType = (
  event: FocusEvent<HTMLInputElement>,
  value: string,
  name: string,
) => void;

export type ChangeSimpleInputType = (
  event: SyntheticEvent<HTMLInputElement>,
  value: string,
  name: string,
) => void;

export type ClickSimpleInputType = (
  event: SyntheticEvent<HTMLInputElement> | KeyboardEvent,
  value: string,
  name: string,
) => void;

export type FocusSimpleInputType = BlurSimpleInputType;

export type KeyPressSimpleInputType = (
  event: KeyboardEvent<HTMLInputElement>,
  value: string,
  name: string,
) => void;

export type SimpleInputPropsType = {
  autoComplete?: 'on' | 'off';
  autoFocus?: boolean;
  isDisabled?: boolean;
  classname?: string;
  dataFind?: string;
  inputRef?: RefObject<HTMLInputElement>;
  name: string;
  onBlur?: BlurSimpleInputType;
  onChange: ChangeSimpleInputType;
  onClick?: ClickSimpleInputType;
  onFocus?: FocusSimpleInputType;
  onKeyPress?: KeyPressSimpleInputType;
  placeholder?: string;
  readOnly?: boolean;
  isError?: boolean;
  inputType:
    | 'hidden'
    | 'image'
    | 'password'
    | 'text'
    | 'search'
    | 'email'
    | 'number'
    | 'tel';
  inputValue: string;
};
