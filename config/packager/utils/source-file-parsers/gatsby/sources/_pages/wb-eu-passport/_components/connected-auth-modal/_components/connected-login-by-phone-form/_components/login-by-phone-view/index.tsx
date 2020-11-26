import React, {
  memo,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { Field, Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import classnames from 'classnames/bind';
import { composeValidators } from '@wildberries/validators';
import i18next from 'i18next';
import { OFFERTA_LINK } from '@/_pages/wb-eu-passport/_constants';
import { Text } from '@/_components/text';
import { Button } from '@/_components/button';
import { Checkbox } from '@/_components/checkbox';
import { formValidations } from '@/_constants/validations/form-validations';
import { phoneNumberPattern } from '@/_constants/validations/patterns';
import { BrowserLink } from '@/_components/browser-link';
import { validationErrorsMap } from '@/_constants/validations/errors-map';
import { MaskedInput } from '@/_components/inputs/masked-input/masked-input';
import { FormTextInput } from '@/_components/inputs/form-text-input';
import { appNamespace } from '@/_constants/i18next/app-namespace';
import { LoginByPhoneFormValuesType } from '../../types';
import { phoneMaskPipe } from '../../_utils/phone-mask-pipe';
import { getPhoneMaskFromI18n } from '../../_utils/get-phone-mask-from-i18n';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

type PropsType = {
  handleSubmitValues: (values: LoginByPhoneFormValuesType) => void;
  initialValues: LoginByPhoneFormValuesType;
  isFormLoading: boolean;
  externalError: string;
  handleChangeInput: (value: string) => void;
};

export const LoginByPhoneView = memo(
  ({
    handleSubmitValues,
    initialValues,
    isFormLoading,
    externalError,
    handleChangeInput,
  }: PropsType) => {
    // define phone old style ref
    const phoneInputRefObject = useRef<{ done: boolean; ref: any }>({
      done: false,
      ref: null,
    });

    // get old style input ref
    const phoneInputRef = useCallback(
      (input?: { inputElement: HTMLInputElement }) => {
        if (input) {
          phoneInputRefObject.current.ref = input.inputElement;
          phoneInputRefObject.current.done = true;
        }
      },
      [],
    );

    // focus the element only when first render
    useEffect(() => {
      phoneInputRefObject.current.ref.focus();
    }, [phoneInputRefObject.current.done]);

    return (
      <section className={cn('Login-phone')} data-component="LoginByPhoneView">
        <div className={cn('Login-phone__title-wrapper')}>
          <Text
            classname={cn('Login-phone__title')}
            color="Black"
            dataFind="login-title"
            isBold
            text={i18next.t(`${appNamespace}:enter-button`)}
          />
        </div>
        <div className={cn('Login-phone__form')}>
          <Form
            initialValues={initialValues}
            onSubmit={handleSubmitValues}
            render={({ handleSubmit, errors, modified }) => {
              const [renderedPlaceholder, setRenderedPlaceholder] = useState(
                '',
              );

              useEffect(
                () =>
                  setRenderedPlaceholder(
                    i18next.t(`${appNamespace}:phone-mask-placeholder`),
                  ),
                [],
              );

              const fieldTextError = useMemo(
                () => externalError || errors.phone,
                [externalError, errors], // eslint-disable-line
              );

              const isButtonDisabled = useMemo(
                () => errors.phone || errors.acceptCondition,
                [fieldTextError, errors], // eslint-disable-line
              );

              const isFieldError = useMemo(
                () =>
                  Boolean(externalError) || (errors.phone && modified.phone),
                [externalError, errors, modified], // eslint-disable-line
              );

              const phoneMask = useMemo(
                () =>
                  getPhoneMaskFromI18n(
                    i18next.t(`${appNamespace}:phone-mask-placeholder`),
                  ),
                [],
              );

              return (
                <form data-find="login-form" onSubmit={handleSubmit}>
                  <div className={cn('Login-phone__input')}>
                    <Field
                      classname={cn('Login-phone__masked-input')}
                      component={MaskedInput}
                      dataFind="phone-input"
                      externalErrorText={externalError}
                      inputComponent={FormTextInput}
                      inputRef={phoneInputRef}
                      inputType="text"
                      isDisabled={isFormLoading}
                      isFullWidth
                      label={i18next.t(`${appNamespace}:contact-phone`)}
                      mask={phoneMask}
                      name="phone"
                      pipe={phoneMaskPipe(phoneMask)}
                      placeholder={renderedPlaceholder}
                      validate={composeValidators([
                        formValidations.phone({
                          pattern: phoneNumberPattern,
                          errorTextValue: i18next.t(
                            validationErrorsMap.incorrect,
                          ),
                        }),
                        formValidations.required(),
                      ])}
                      withoutHelperText
                    />
                    <OnChange name="phone">{handleChangeInput}</OnChange>
                  </div>
                  <div className={cn('Login-phone__button')}>
                    <Button
                      dataFind="submit-button"
                      disabled={isButtonDisabled}
                      isFullWidth
                      isLoading={isFormLoading}
                      size="big"
                      text={i18next.t(`${appNamespace}:submit-phone-number`)}
                      textUpperCase
                      type="submit"
                      variant="main"
                    />
                  </div>
                  <div className={cn('Login-phone__input-error')}>
                    {isFieldError && (
                      <Text
                        color="Violet"
                        dataFind="phone-error"
                        text={fieldTextError}
                      />
                    )}
                  </div>
                  <div className={cn('Login-phone__subscription')}>
                    <Field
                      component={Checkbox}
                      dataFind="checkbox-discount"
                      disabled
                      labelColor="Black"
                      labelSize="h5"
                      labelText={i18next.t(`${appNamespace}:checkbox-text`)}
                      name="subscription"
                      type="checkbox"
                      variant="interface"
                    />
                  </div>
                  <div
                    className={cn('Login-phone__accept')}
                    data-find="checkbox-accept-condition-container"
                  >
                    <Field
                      name="acceptCondition"
                      type="checkbox"
                      // uncomment if there will be an interactive checkbox
                      // validate={composeValidators([formValidations.required])}
                    >
                      {({ meta, input }) => (
                        <Checkbox
                          dataFind="checkbox-offerta"
                          disabled // comment if there will be an interactive checkbox
                          input={input}
                          labelColor="GreyText"
                          labelSize="h6"
                          labelText={i18next.t(
                            `${appNamespace}:agree-offerta-text`,
                          )}
                          meta={meta}
                        >
                          <BrowserLink
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
                    <span className={cn('Login-phone__accept-content')} />
                  </div>
                </form>
              );
            }}
            subscription={{
              invalid: true,
              errors: true,
              modified: true,
            }}
          />
        </div>
      </section>
    );
  },
);
