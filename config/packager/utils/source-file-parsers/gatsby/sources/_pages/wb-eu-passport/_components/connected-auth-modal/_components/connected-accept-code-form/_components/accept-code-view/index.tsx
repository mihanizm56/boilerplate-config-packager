import React, { memo, useMemo, useRef, useEffect, KeyboardEvent } from 'react';
import { Field, Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import classnames from 'classnames/bind';
import { composeValidators } from '@wildberries/validators';
import i18next from 'i18next';
import { fieldFormFormatter } from '@/_pages/wb-eu-passport/_utils/field-form-formatter';
import { getRemainingTime } from '@/_pages/wb-eu-passport/_utils/get-remaining-time';
import { FormParamsType } from '@/_pages/wb-eu-passport/_types';
import { OFFERTA_LINK } from '@/_pages/wb-eu-passport/_constants';
import { Text } from '@/_components/text';
import { Button } from '@/_components/button';
import { IconButton } from '@/_components/icon-button';
import { OrderArrow } from '@/_components/icons/order-arrow';
import { Checkbox } from '@/_components/checkbox';
import { noop } from '@/_utils/noop';
import { formValidations } from '@/_constants/validations/form-validations';
import { BrowserLink } from '@/_components/browser-link';
import { preventEvent } from '@/_utils/prevent-events';
import { FormTextInput } from '@/_components/inputs/form-text-input';
import { appNamespace } from '@/_constants/i18next/app-namespace';
import { normalizeCodeInput } from '../../_utils';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  openLoginForm: () => void;
  phone: string;
  initialValues: FormParamsType;
  handleChangeCode: (code: string) => void;
  sendNotifyCodeAgain: () => void;
  timerForNextRequest: number;
  isFormLoading: boolean;
  externalError: string;
  handleFormKeydown: (event: KeyboardEvent<HTMLFormElement>) => void;
};

export const AcceptCodeView = memo(
  ({
    openLoginForm,
    phone,
    initialValues,
    handleChangeCode,
    sendNotifyCodeAgain,
    timerForNextRequest,
    isFormLoading,
    externalError,
    handleFormKeydown,
  }: PropsType) => {
    const smsCodeInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => smsCodeInputRef.current.focus(), []); // eslint-disable-line

    const { seconds, minutes } = useMemo(
      () => getRemainingTime(timerForNextRequest),
      [timerForNextRequest],
    );

    return (
      <section className={cn('Accept-code')} data-component="AcceptCodeView">
        <div className={cn('Accept-code__icon')}>
          <IconButton
            classname={cn('Accept-code__button-icon')}
            dataFind="back-button"
            handleClick={openLoginForm}
            isTransparent
          >
            <OrderArrow />
          </IconButton>
        </div>
        <div className={cn('Accept-code__header')}>
          <Text
            color="Black"
            dataFind="accept-title"
            isBold
            text={i18next.t(`${appNamespace}:enter-code`)}
          />
        </div>
        <span className={cn('Accept-code__info-container')}>
          <Text
            classname={cn('Accept-code__text')}
            dataFind="sended-phone-number"
            text={i18next.t(`${appNamespace}:code-sended`)}
          />
          <Text classname={cn('Accept-code__phone')} text={phone} />
        </span>
        <div className={cn('Accept-code__form-wrapper')}>
          <Form
            initialValues={initialValues}
            onSubmit={noop}
            render={({ modified, errors, form }) => {
              const isButtonSubmitDisabled = useMemo(
                () =>
                  timerForNextRequest > 0 ||
                  !Boolean(form.getState().values.acceptCondition),
                [timerForNextRequest, form], // eslint-disable-line
              );

              const fieldTextError = useMemo(
                () => externalError || errors.notifyCode,
                [externalError, errors], // eslint-disable-line
              );

              const isFieldError = useMemo(
                () =>
                  Boolean(externalError) ||
                  (errors.notifyCode && modified.notifyCode),
                [externalError, errors, modified], // eslint-disable-line
              );

              return (
                // eslint-disable-next-line
                <form
                  className={cn('Accept-code__form')}
                  data-find="accept-form"
                  onKeyDown={handleFormKeydown}
                  onSubmit={preventEvent}
                >
                  <div className={cn('Accept-code__form-input-wrapper')}>
                    <Field
                      classname={cn('Accept-code__form-input')}
                      component={FormTextInput}
                      dataFind="code-input"
                      externalErrorText={externalError}
                      inputRef={smsCodeInputRef}
                      isDisabled={isFormLoading}
                      name="notifyCode"
                      parse={normalizeCodeInput}
                      validate={composeValidators([formValidations.required()])}
                      valueFormatter={fieldFormFormatter}
                      withoutHelperText
                    />
                    <OnChange name="notifyCode">{handleChangeCode}</OnChange>
                    <div className={cn('Accept-code__input-error')}>
                      {isFieldError && (
                        <Text
                          color="Violet"
                          dataFind="code-error"
                          text={fieldTextError}
                        />
                      )}
                    </div>
                  </div>
                  <div className={cn('Accept-code__form-button')}>
                    <Button
                      dataFind="repeat-button"
                      disabled={isButtonSubmitDisabled}
                      handleClick={sendNotifyCodeAgain}
                      isFullWidth
                      isLoading={isFormLoading}
                      size="big"
                      text={i18next.t(`${appNamespace}:get-additional-code`)}
                      textUpperCase
                      type="button"
                      variant="main"
                    />
                  </div>
                  <div className={cn('Accept-code__form-timer')}>
                    {Boolean(timerForNextRequest) && (
                      <Text
                        color="GreyText"
                        dataFind="timer-text"
                        text={i18next.t(
                          `${appNamespace}:repeat-sending-abled`,
                          {
                            minutes,
                            seconds,
                          },
                        )}
                      />
                    )}
                  </div>
                  <div
                    className={cn('Accept-code__accept')}
                    data-find="checkbox-accept-condition-container"
                  >
                    <Field
                      name="acceptCondition"
                      type="checkbox"
                      // uncomment if there will be an interactive checkbox
                      // validate={composeValidators([formValidations.required])}
                    >
                      {({ input, meta }) => (
                        <Checkbox
                          classNameTextContainer={cn(
                            'Accept-code__accept-text',
                          )}
                          dataFind="checkbox-offerta" // comment if there will be an interactive checkbox
                          disabled
                          input={input}
                          labelColor="GreyText"
                          labelSize="h6"
                          labelText={i18next.t(
                            `${appNamespace}:agree-offerta-text`,
                          )}
                          meta={meta}
                        >
                          <BrowserLink
                            classname={cn('Accept-code__accept-link')}
                            dataFind="link"
                            routeName={OFFERTA_LINK}
                            size="h6"
                            target="_blank"
                            text={i18next.t(
                              `${appNamespace}:agree-offerta-text-addition`,
                            )}
                            type="text-with-reload"
                          />
                        </Checkbox>
                      )}
                    </Field>
                  </div>
                </form>
              );
            }}
            subscription={{
              modified: true,
              errors: true,
            }}
          />
        </div>
      </section>
    );
  },
);
