import i18next from 'i18next';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.scss';

const BLOCK_NAME = 'Page';
const cn = classNames.bind(styles);

export const Page = React.memo(() => {
  return (
    <div className={cn(BLOCK_NAME)}>
      <p>Page 1 {i18next.t('page-1:test-key')}</p>
    </div>
  );
});
