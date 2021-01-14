import i18next from 'i18next';
import React from 'react';
import s from './index.scss';

export const Page = React.memo(() => {
  return (
    <div className={s.root}>
      <p>Page 2 {i18next.t('page-2:test-key')}</p>
    </div>
  );
});
