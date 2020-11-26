import React, { Props, memo } from 'react';
import classnames from 'classnames/bind';
import { FontSizeType, Text } from '@/_components/text';
import { BrowserLinkType } from './types';
import styles from './index.module.scss';

const cn = classnames.bind(styles);
type TargetType = '_blank' | '_self';

type PropsType = {
  text?: string;
  type: BrowserLinkType;
  size?: FontSizeType;
  isBold?: boolean;
  isCentered?: boolean;
  routeName: string;
  classname?: string;
  textClassname?: string;
  dataFind?: string;
  target?: TargetType;
} & Props<any>;

export const BrowserLink = memo(
  ({
    routeName,
    children,
    classname,
    textClassname,
    text,
    size,
    isBold,
    isCentered,
    target = '_self',
    type,
    dataFind,
  }: PropsType) => (
    <a
      className={cn('browserLink', {
        [classname]: Boolean(classname),
        [`browserLink--${type}`]: Boolean(type),
      })}
      data-find={dataFind}
      href={routeName}
      target={target}
    >
      {children || (
        <Text
          classname={cn('browserLinkText', {
            [textClassname]: Boolean(textClassname),
          })}
          isBold={isBold}
          isCentered={isCentered}
          size={size}
          text={text}
        />
      )}
    </a>
  ),
);
