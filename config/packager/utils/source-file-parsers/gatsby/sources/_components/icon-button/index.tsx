import React, { Props, memo, RefObject } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  classname?: string;
  handleClick?: () => void;
  buttonRef?: RefObject<HTMLButtonElement>;
  isTransparent?: boolean;
  dataFind?: string;
} & Props<any>;

export const IconButton = memo(
  ({
    children: Icon,
    classname,
    handleClick,
    buttonRef,
    isTransparent,
    dataFind,
  }: PropsType) => (
    <button
      ref={buttonRef}
      className={cn('iconButton', {
        [classname]: Boolean(classname),
        'iconButton--transparent': isTransparent,
      })}
      data-find={dataFind}
      onClick={handleClick}
      type="button"
    >
      {Icon}
    </button>
  ),
);
