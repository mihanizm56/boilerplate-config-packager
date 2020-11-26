import React, {
  Props,
  memo,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import classnames from 'classnames/bind';
import { Text } from '@/_components/text';
import { Overlay } from '@/_components/overlay';
import { Button } from '@/_components/button';
import { Portal } from '@/_components/portal';
import { IconButton } from '@/_components/icon-button';
import { ButtonType } from '../button/types';
import { CloseModalIcon } from './_components/close-modal-icon';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  title?: string;
  closeModalCallback: () => void;
  buttonActionCallback?: () => void;
  containerClassname?: string;
  buttonActionText?: string;
  buttonActionType?: ButtonType;
  buttonCloseText?: string;
  buttonCloseType?: ButtonType;
  isOpened: boolean;
  isTransparent?: boolean;
} & Props<any>;

export const Modal = memo(
  ({
    title,
    children,
    containerClassname,
    buttonActionText,
    buttonActionType,
    buttonActionCallback,
    buttonCloseText,
    buttonCloseType,
    closeModalCallback,
    isOpened,
    isTransparent,
  }: PropsType) => {
    const modalRef = useRef(null);
    const buttonCloseRef = useRef(null);

    const isActionButtonShown = useMemo(
      () => buttonActionText && buttonActionType && buttonActionCallback,
      [buttonActionCallback, buttonActionText, buttonActionType],
    );
    const isCancelButtonShown = useMemo(
      () => buttonCloseText && buttonCloseType,
      [buttonCloseText, buttonCloseType],
    );

    const handleDocumentClick = useCallback(
      ({ target }) => {
        /*        if (modalRef.current && !modalRef.current.contains(target)) {
          closeModalCallback();
        } */

        if (buttonCloseRef.current && buttonCloseRef.current.contains(target)) {
          closeModalCallback();
        }
      },
      [closeModalCallback],
    );

    const handleDocumentKeyDown = useCallback(
      ({ keyCode }) => {
        if (keyCode === 27) {
          closeModalCallback();
        }
      },
      [closeModalCallback],
    );

    useEffect(() => {
      document.addEventListener('mousedown', handleDocumentClick);
      document.addEventListener('keydown', handleDocumentKeyDown);

      return () => {
        document.removeEventListener('mousedown', handleDocumentClick);
        document.removeEventListener('keydown', handleDocumentKeyDown);
      };
    }, []); // eslint-disable-line

    return (
      <Portal prefix="modal">
        <Overlay
          classname={cn('overlayModalContainer', {
            isTransparent,
          })}
          isOpened={isOpened}
          layer="layer-1"
          timeout={150}
        >
          <div className={cn('modalPositionWrapper')} role="presentation">
            <div
              ref={modalRef}
              className={cn('modalContainer', {
                [containerClassname]: Boolean(containerClassname),
              })}
            >
              <IconButton
                buttonRef={buttonCloseRef}
                classname={cn('closeButton')}
              >
                <CloseModalIcon />
              </IconButton>

              {Boolean(title) && (
                <div className={cn('modalTitle')}>
                  <Text color="Black" size="h1" text={title} />
                </div>
              )}
              <div className={cn('modalContent')}>{children}</div>
              <div className={cn('modalButtonsContainer')}>
                {isActionButtonShown && (
                  <div className={cn('modalButtonsContainerButtonWrapper')}>
                    <Button
                      handleClick={buttonActionCallback}
                      size="big"
                      text={buttonActionText}
                      type={buttonActionType}
                      variant="main"
                    />
                  </div>
                )}
                {isCancelButtonShown && (
                  <div className={cn('modalButtonsContainerButtonWrapper')}>
                    <Button
                      handleClick={closeModalCallback}
                      size="big"
                      text={buttonCloseText}
                      type={buttonCloseType}
                      variant="interface"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Overlay>
      </Portal>
    );
  },
);
