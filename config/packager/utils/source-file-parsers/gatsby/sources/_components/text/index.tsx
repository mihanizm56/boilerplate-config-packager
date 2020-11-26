import React, { Props, memo } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  text: string;
  size?: FontSizeType;
  color?: FontColorType;
  isBold?: boolean;
  isCentered?: boolean;
  isUpperCase?: boolean;
  classname?: string;
  dataFind?: string;
} & Props<any>;

export type FontSizeType =
  | 'h1'
  | 'h1-bold'
  | 'h2'
  | 'h2-bold'
  | 'h3'
  | 'h3-bold'
  | 'h4'
  | 'h4-bold'
  | 'h5'
  | 'h5-bold'
  | 'h6'
  | 'h6-bold'
  | 'h7'
  | 'h8';

export type FontColorType =
  | 'Orange'
  | 'DarkPurple'
  | 'Purple'
  | 'SuperDuperLightPurple'
  | 'Red'
  | 'LightRed'
  | 'LightYellow'
  | 'LightBlue'
  | 'Black'
  | 'White'
  | 'RichGrey'
  | 'Grey'
  | 'GreyText'
  | 'GreyCheckbox'
  | 'LightGrey'
  | 'GreyMidle'
  | 'Violet'
  | 'SuccessTextColor';

export const Text = memo(
  ({
    text,
    size,
    color,
    isBold,
    isCentered,
    isUpperCase,
    classname,
    dataFind,
  }: PropsType) => (
    <span
      className={cn('text', {
        [`size-${size}`]: Boolean(size),
        [`color-${color}`]: Boolean(color),
        isBold,
        isCentered,
        isUpperCase,
        [classname]: Boolean(classname),
      })}
      data-find={dataFind}
    >
      {text}
    </span>
  ),
);
