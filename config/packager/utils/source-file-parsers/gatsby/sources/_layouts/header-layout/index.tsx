import React, { memo, PropsWithChildren } from 'react';
import classnames from 'classnames/bind';
import { HeaderIcon } from './_components/header-icon';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

export const HeaderLayout = memo(({ children }: PropsWithChildren<{}>) => (
  <>
    <header className={cn('Header')}>
      <HeaderIcon />
    </header>

    {children}
  </>
));
