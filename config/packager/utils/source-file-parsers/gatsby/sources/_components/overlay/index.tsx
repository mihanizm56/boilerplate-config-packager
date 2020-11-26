import React, {
  Props,
  useRef,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
} from 'react';
import classnames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

interface IProps extends Props<any> {
  handleClick?: (event?: SyntheticEvent<any>, isOverlayClick?: boolean) => void;
  isTransparent?: boolean;
  isOpened: boolean;
  timeout: number;
  isWhiteBackground?: boolean;
  isInherit?: boolean;
  classname?: string;
  opacity?: string;
  isAbsolute?: boolean;
  layer?:
    | 'layer-under'
    | 'layer-1'
    | 'layer-2'
    | 'layer-3'
    | 'layer-4'
    | 'layer-5'
    | 'layer-full';
}

const DEFAULT_TIME_TO_SHOW_OVERLAY = 500;
const DEFAULT_OPACITY_VALUE = '0.5';

export const Overlay = memo(
  ({
    handleClick,
    isTransparent,
    children,
    isOpened,
    timeout = DEFAULT_TIME_TO_SHOW_OVERLAY,
    isWhiteBackground,
    layer,
    classname,
    isAbsolute,
    isInherit,
    opacity = DEFAULT_OPACITY_VALUE,
  }: IProps) => {
    const refLayout = useRef(null);
    const overlayClassName = cn('Overlay');

    const getClickOnOverlay = useCallback(
      (event: SyntheticEvent) => {
        if (event.target === refLayout.current && handleClick) {
          handleClick(event, true);
        }
      },
      [handleClick],
    );

    useEffect(() => {
      const container: HTMLElement = document.querySelector(
        `.${overlayClassName}`,
      );

      if (Boolean(container)) {
        container.parentElement.style.setProperty(
          '--overlay-animation-duration',
          `${timeout}ms`,
        );
        container.parentElement.style.setProperty('--overlay-opacity', opacity);
      }
    }, [isOpened]); // eslint-disable-line

    return (
      <CSSTransition
        classNames={{
          enter: cn('Overlay--enter'),
          exit: cn('Overlay--exit'),
        }}
        in={isOpened}
        timeout={timeout}
        unmountOnExit
      >
        <div
          ref={refLayout}
          className={cn('Overlay', {
            'Overlay--inherit': isInherit,
            'Overlay--transparent': isTransparent,
            'Overlay--whiteBackground': isWhiteBackground,
            'Overlay--absolute': isAbsolute,
            [layer]: Boolean(layer),
            [classname]: Boolean(classname),
          })}
          onClick={getClickOnOverlay}
          role="presentation"
        >
          {children}
        </div>
      </CSSTransition>
    );
  },
);
