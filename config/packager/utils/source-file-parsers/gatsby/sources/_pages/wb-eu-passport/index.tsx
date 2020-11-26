import React, { memo } from 'react';
import classnames from 'classnames/bind';
import { ConnectedAuthModal } from './_components/connected-auth-modal';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

export const Passport = memo(() => (
  <div className={cn('Page')} data-page="home">
    <ConnectedAuthModal />
  </div>
));
