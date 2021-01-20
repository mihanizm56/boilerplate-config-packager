import React, { memo } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';
import { FontSizeType, FontColorType, TagType } from './_types';

const cn = classNames.bind(style);

type PropsType = {
  /** text color */
  color: FontColorType;
  /** text ellipsis flag */
  isEllipsis?: boolean;
  /** text case flag */
  isUpperCase?: boolean;
  /** text size type */
  size: FontSizeType;
  /** tag type */
  tagType?: TagType;
  /** text type */
  text: string;
};

export const Text = memo(
  ({
    color,
    isUpperCase,
    size,
    tagType: Tag = 'span',
    text,
    isEllipsis,
  }: PropsType) => {
    return (
      <Tag
        className={cn('Text', {
          [`Text--${size}`]: Boolean(size),
          [`Text--${color}`]: Boolean(color),
          'Text--uppercase': isUpperCase,
          'Text--ellipsis': isEllipsis,
        })}
        data-name="Text"
      >
        {text}
      </Tag>
    );
  },
);
