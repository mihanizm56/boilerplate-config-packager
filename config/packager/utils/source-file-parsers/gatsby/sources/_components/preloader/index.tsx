import React, { memo, Props } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

interface IProps extends Props<any> {
  size?: sizeType;
  color?: 'White' | 'Violet';
}

export type sizeType = 'small' | 'medium' | 'large';

export const Preloader = memo(({ size = 'small', color }: IProps) => (
  <div className={cn('wrapper')}>
    <div
      className={cn('circular', {
        [`size-${size}`]: Boolean(size),
        [`color-${color}`]: Boolean(color),
      })}
    />
  </div>
));
