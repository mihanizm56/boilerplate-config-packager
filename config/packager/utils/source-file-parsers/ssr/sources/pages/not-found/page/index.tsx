import React from 'react';
import s from './index.scss';

export const Page = React.memo(() => {
  return <div className={s.root}>404 – Not Found</div>;
});
