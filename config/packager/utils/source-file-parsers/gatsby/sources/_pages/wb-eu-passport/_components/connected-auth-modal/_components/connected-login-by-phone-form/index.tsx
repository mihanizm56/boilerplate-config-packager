import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action, BaseAction } from '@wildberries/redux-core-modules';
import { bindActionCreators, Dispatch } from 'redux';
import { batchActions } from 'redux-batched-actions';
import { FormParamsType } from '@/_pages/wb-eu-passport/_types';
import {
  fetchPhoneNumberActionSaga,
  loginFormFormValuesSelector,
  loginFormIsLoadingSelector,
  loginFormExternalErrorSelector,
  removeExternalErrorLoginFormAction,
  setPhoneValueAction,
} from '@/_pages/wb-eu-passport/_redux/login-form-module';
import { IGlobalState } from '@/_types/global';
import { LoginByPhoneFormValuesType } from './types';
import { LoginByPhoneView } from './_components/login-by-phone-view';

type PropsType = {
  receiveCode: Action<FormParamsType>;
  phone: string;
  initialValues: LoginByPhoneFormValuesType;
  isFormLoading: boolean;
  externalError: string;
  dispatch: Dispatch;
  removeExternalErrorLoginForm: BaseAction;
  setPhoneValue: Action<string>;
};

export class WrappedContainer extends Component<PropsType> {
  handleSubmitValues = ({
    acceptCondition,
    phone,
  }: LoginByPhoneFormValuesType) =>
    this.props.receiveCode({ phone, acceptCondition });

  handleChangeInput = (phoneValue: string) => {
    const {
      externalError,
      removeExternalErrorLoginForm,
      setPhoneValue,
      dispatch,
    } = this.props;

    if (Boolean(externalError)) {
      dispatch(
        batchActions([
          setPhoneValue(phoneValue),
          removeExternalErrorLoginForm(),
        ]),
      );
    }
  };

  render() {
    const { isFormLoading, initialValues, externalError } = this.props;

    return (
      <LoginByPhoneView
        externalError={externalError}
        handleChangeInput={this.handleChangeInput}
        handleSubmitValues={this.handleSubmitValues}
        initialValues={initialValues}
        isFormLoading={isFormLoading}
      />
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  initialValues: loginFormFormValuesSelector(state),
  isFormLoading: loginFormIsLoadingSelector(state),
  externalError: loginFormExternalErrorSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      receiveCode: fetchPhoneNumberActionSaga,
      removeExternalErrorLoginForm: removeExternalErrorLoginFormAction,
      setPhoneValue: setPhoneValueAction,
      dispatch,
    },
    dispatch,
  );

export const ConnectedLoginFormByPhoneForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedContainer);
