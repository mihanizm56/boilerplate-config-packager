import React, { Props, memo, useMemo } from 'react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  viewBox: string;
} & Props<any>;

export const InitialAppPreloader = memo(({ viewBox }: PropsType) => {
  const isIE11 = useMemo(
    () =>
      // eslint-disable-next-line
      // @ts-ignore because we search for ie11 and ts doesnt have this type
      Boolean(window.MSInputMethodContext) && Boolean(document.documentMode),
    [],
  );

  return (
    <div className={cn('Preloader')}>
      <div className={cn('Preloader__icon-layout')}>
        <div className={cn('Preloader__loading-icon')}>
          <svg className={cn('Preloader__circular')} viewBox={viewBox}>
            <circle
              className={cn('Preloader__path', {
                'Preloader__path--new': !isIE11,
              })}
              cx="50"
              cy="50"
              fill="none"
              r="20"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});
