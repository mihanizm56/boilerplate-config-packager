import React, { memo, useEffect } from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Overlay } from '@/_components/overlay';
import {
  loginFormIsOpenedSelector,
  acceptCodeFormIsOpenedSelector,
  IUIStatePart,
} from '@/_pages/wb-eu-passport/_redux/ui-module';
import { ConnectedLoginFormByPhoneForm } from './_components/connected-login-by-phone-form';
import { ConnectedAcceptCodeForm } from './_components/connected-accept-code-form';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  isLoginFormOpened: boolean;
  isAcceptFormOpened: boolean;
};

export const BLOCK_NAME = 'Auth-modal';
const TIME_TO_SHOW_MODAL = 200;

export const WrappedViewComponent = memo(
  ({ isLoginFormOpened, isAcceptFormOpened }: PropsType) => {
    const authModalClassName = cn(BLOCK_NAME);

    useEffect(() => {
      const container: HTMLElement = document.querySelector(
        `.${authModalClassName}`,
      );

      if (Boolean(container)) {
        container.style.setProperty(
          '--auth-modal-animation-duration',
          `${TIME_TO_SHOW_MODAL}ms`,
        );
      }
    }, []); // eslint-disable-line

    return (
      <Overlay
        classname={cn(`${BLOCK_NAME}__overlay`)}
        isOpened
        isTransparent
        layer="layer-full"
        timeout={TIME_TO_SHOW_MODAL}
      >
        <div className={authModalClassName}>
          <CSSTransition
            classNames={{
              enter: cn(`${BLOCK_NAME}--enter`),
              exit: cn(`${BLOCK_NAME}--exit`),
            }}
            in={isLoginFormOpened}
            timeout={TIME_TO_SHOW_MODAL}
            unmountOnExit
          >
            <ConnectedLoginFormByPhoneForm />
          </CSSTransition>
          <CSSTransition
            classNames={{
              enter: cn(`${BLOCK_NAME}--enter`),
              exit: cn(`${BLOCK_NAME}--exit`),
            }}
            in={isAcceptFormOpened}
            timeout={TIME_TO_SHOW_MODAL}
            unmountOnExit
          >
            <ConnectedAcceptCodeForm />
          </CSSTransition>
        </div>
      </Overlay>
    );
  },
);

const mapStateToProps = (state: IUIStatePart) => ({
  isLoginFormOpened: loginFormIsOpenedSelector(state),
  isAcceptFormOpened: acceptCodeFormIsOpenedSelector(state),
});

export const ConnectedAuthModal = connect(mapStateToProps)(
  WrappedViewComponent,
);
