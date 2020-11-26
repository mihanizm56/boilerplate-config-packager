import React, { memo, useCallback, ChangeEvent, useMemo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import classnames from 'classnames/bind';
import { Text, FontColorType, FontSizeType } from '@/_components/text';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type CheckboxVariant = 'interface';

type Props = FieldRenderProps<string, HTMLInputElement>;

type PropsType = {
  disabled?: boolean;
  variant?: CheckboxVariant;
  labelColor?: FontColorType;
  labelSize?: FontSizeType;
  labelText?: string;
  classname?: string;
  dataFind?: string;
  classNameTextContainer?: string;
  children?: any;
} & Props;

export const Checkbox = memo(
  ({
    input: { checked, onChange },
    labelText,
    labelSize,
    labelColor = 'Black',
    disabled,
    dataFind,
    variant,
    classname,
    classNameTextContainer,
    children,
  }: PropsType) => {
    const handleChange = useCallback(
      ({ target }: ChangeEvent<HTMLInputElement>) => onChange(target.checked),
      [], // eslint-disable-line
    );
    const colorText = useMemo(() => (disabled ? 'GreyCheckbox' : labelColor), [
      disabled,
      labelColor,
    ]);

    return (
      <div className={cn('Checkbox')}>
        <label className={cn('Checkbox__container')} data-find={dataFind}>
          <input
            checked={checked}
            className={cn('Checkbox__input')}
            disabled={disabled}
            onChange={handleChange}
            type="checkbox"
          />
          <span
            className={cn('Checkbox__icon', {
              [`Checkbox__icon--${variant}`]: Boolean(variant),
            })}
          >
            <svg
              fill="none"
              height="10"
              viewBox="0 0 14 10"
              width="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.75722 3.99473C1.43179 3.66929 0.90415 3.66929 0.578713 3.99473C0.253276 4.32017 0.253276 4.8478 0.578713 5.17324L1.75722 3.99473ZM5.33464 8.75065L4.74538 9.33991C4.90733 9.50186 5.12881 9.59002 5.35776 9.58366C5.58671 9.57731 5.80295 9.477 5.95567 9.30631L5.33464 8.75065ZM13.039 1.38965C13.3459 1.04666 13.3166 0.519834 12.9736 0.21295C12.6306 -0.0939339 12.1038 -0.0646659 11.7969 0.278322L13.039 1.38965ZM0.578713 5.17324L4.74538 9.33991L5.92389 8.1614L1.75722 3.99473L0.578713 5.17324ZM5.95567 9.30631L13.039 1.38965L11.7969 0.278322L4.7136 8.19499L5.95567 9.30631Z" />
            </svg>
          </span>
        </label>
        <div
          className={cn('Checkbox__text-container', {
            [classNameTextContainer]: Boolean(classNameTextContainer),
            'Checkbox__text-container--disabled': disabled,
          })}
        >
          <Text
            classname={classname}
            color={colorText}
            size={labelSize}
            text={labelText}
          />
          {children}
        </div>
      </div>
    );
  },
);
