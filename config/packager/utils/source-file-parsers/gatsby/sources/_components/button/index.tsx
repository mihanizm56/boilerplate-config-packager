/* eslint-disable react/jsx-props-no-spreading */
import React, {
  Props,
  memo,
  SyntheticEvent,
  useCallback,
  useMemo,
} from 'react';
import classnames from 'classnames/bind';
import { Text, FontSizeType, FontColorType } from '@/_components/text';
import { Preloader } from '@/_components/preloader';
import { Overlay } from '@/_components/overlay';
import { getPreloaderColor } from './_utils';
import { ButtonVariant, ButtonType, ButtonSize } from './types';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  text?: string;
  type: ButtonType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  handleClick?: (event?: SyntheticEvent) => any;
  disabled?: boolean;
  customTextClassname?: string;
  textUpperCase?: boolean;
  isLoading?: boolean;
  textSize?: FontSizeType;
  classname?: string;
  dataFind?: string;
  buttonIconContainerClassname?: string;
  icon?: any; // todo fix type
  color?: FontColorType;
  isFullWidth?: boolean;
} & Props<any>;

export const Button = memo(
  ({
    text,
    textSize = 'h6',
    type,
    size,
    handleClick,
    disabled,
    variant,
    textUpperCase,
    customTextClassname,
    isLoading,
    classname,
    isFullWidth,
    icon: Icon,
    buttonIconContainerClassname,
    color,
    dataFind,
  }: PropsType) => {
    const isInterfaceFont = useMemo(() => variant === 'interface', [variant]);
    const isButtonTextBold = useMemo(() => !isInterfaceFont, [isInterfaceFont]);
    const preloaderColor = useMemo(
      () => getPreloaderColor({ variant, disabled }),
      [variant, disabled],
    );
    const isWithoutText = useMemo(() => !Boolean(text) || !Boolean(size), [
      size,
      text,
    ]);

    const handleClickButton = useCallback(
      (event) => {
        event.stopPropagation();

        if (Boolean(handleClick)) {
          handleClick(event);
        }
      },
      [handleClick],
    );

    return (
      // eslint-disable-next-line react/button-has-type
      <button
        className={cn('Button', {
          [`Button--${variant}`]: Boolean(variant),
          [`size-${size}`]: Boolean(size),
          [classname]: Boolean(classname),
          [`Button--${variant}-disabled`]: disabled,
          'Button--full-width': isFullWidth,
          'Button--disabled': disabled,
          'Button--loading': isLoading,
          'Button--hover': !disabled, // todo remove
        })}
        data-find={dataFind}
        disabled={disabled}
        onClick={handleClickButton}
        type={type} // eslint-disable-line
      >
        {Boolean(Icon) && (
          <div
            className={cn('buttonIconContainer', {
              [buttonIconContainerClassname]: Boolean(
                buttonIconContainerClassname,
              ),
            })}
          >
            <Icon />
          </div>
        )}

        {!isWithoutText && (
          <Text
            classname={customTextClassname}
            color={color}
            isBold={isButtonTextBold}
            isUpperCase={textUpperCase}
            size={textSize}
            text={text}
          />
        )}

        <Overlay isAbsolute isOpened={isLoading} isTransparent timeout={150}>
          <Preloader color={preloaderColor} size="medium" />
        </Overlay>
      </button>
    );
  },
);
