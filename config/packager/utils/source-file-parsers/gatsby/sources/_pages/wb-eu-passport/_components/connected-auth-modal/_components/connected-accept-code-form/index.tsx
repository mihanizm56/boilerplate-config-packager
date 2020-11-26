import React, { Component, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { Action, BaseAction } from '@wildberries/redux-core-modules';
import { bindActionCreators, Dispatch } from 'redux';
import { batchActions } from 'redux-batched-actions';
import {
  timerForNextRequestSelector,
  setTimerAction,
} from '@/_pages/wb-eu-passport/_redux/login-app-module';
import {
  loginFormPhoneFormattedSelector,
  fetchPhoneNumberActionSaga,
  loginFormPhonePureSelector,
} from '@/_pages/wb-eu-passport/_redux/login-form-module';
import {
  fetchAcceptCodeActionSaga,
  acceptCodeFormFormValuesSelector,
  acceptCodeFormIsLoadingSelector,
  acceptCodeFormExternalErrorSelector,
  removeExternalErrorAcceptFormAction,
  setAcceptCodeAction,
} from '@/_pages/wb-eu-passport/_redux/accept-code-form-module';
import { FormParamsType } from '@/_pages/wb-eu-passport/_types';
import {
  openLoginFormAction,
  closeAcceptFormAction,
} from '@/_pages/wb-eu-passport/_redux/ui-module';
import { IGlobalState } from '@/_types/global';
import { AcceptCodeView } from './_components/accept-code-view';
import { ESCAPE_KEYCODE } from './constants';

type PropsType = {
  timerForNextRequest: number;
  closeAcceptForm: BaseAction;
  openLoginModal: BaseAction;
  sendOTP: Action<string>;
  getNotifyCodeAgain: Action<FormParamsType>;
  initialFormValues: FormParamsType;
  phone: string;
  formattedPhone: string;
  token: string;
  setTimer: Action<number>;
  isFormLoading: boolean;
  externalError: string;
  removeExternalErrorAcceptForm: BaseAction;
  setAcceptCode: Action<string>;
  dispatch: Dispatch;
};

type StateType = {
  timeoutValue: number;
};

export class WrappedContainer extends Component<PropsType, StateType> {
  timerId: number;

  state = {
    timeoutValue: 0,
  };

  componentDidMount() {
    this.setState({ timeoutValue: this.props.timerForNextRequest });

    this.timerId = window.setInterval(this.timer, 1000);
  }

  componentDidUpdate(prevProps: PropsType) {
    const { timerForNextRequest } = this.props;

    if (
      timerForNextRequest &&
      prevProps.timerForNextRequest !== timerForNextRequest
    ) {
      this.setState({ timeoutValue: timerForNextRequest }); // eslint-disable-line

      this.timerId = window.setInterval(this.timer, 1000);
    }
  }

  componentWillUnmount() {
    this.props.setTimer(0);

    clearInterval(this.timerId);
  }

  handleChangeCode = (notifyCode: string): void => {
    const {
      sendOTP,
      externalError,
      removeExternalErrorAcceptForm,
      setAcceptCode,
      dispatch,
    } = this.props;

    if (Boolean(externalError)) {
      dispatch(
        batchActions([
          removeExternalErrorAcceptForm(),
          setAcceptCode(notifyCode),
          sendOTP(notifyCode),
        ]),
      );
    } else {
      sendOTP(notifyCode);
    }
  };

  timer = () => {
    const { timeoutValue } = this.state;

    if (timeoutValue <= 0) {
      clearInterval(this.timerId);
      this.props.setTimer(0);
    } else {
      this.setState({ timeoutValue: timeoutValue - 1 });
    }
  };

  handleGetNewCode = () =>
    this.props.getNotifyCodeAgain({
      phone: this.props.phone,
      acceptCondition: true,
    });

  handleOpenLoginForm = () =>
    this.props.dispatch(
      batchActions([this.props.closeAcceptForm(), this.props.openLoginModal()]),
    );

  handleFormKeydown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.keyCode === ESCAPE_KEYCODE) {
      this.props.dispatch(
        batchActions([
          this.props.closeAcceptForm(),
          this.props.openLoginModal(),
        ]),
      );
    }
  };

  render() {
    const { timeoutValue } = this.state;
    const {
      formattedPhone,
      initialFormValues,
      isFormLoading,
      externalError,
    } = this.props;

    return (
      <AcceptCodeView
        externalError={externalError}
        handleChangeCode={this.handleChangeCode}
        handleFormKeydown={this.handleFormKeydown}
        initialValues={initialFormValues}
        isFormLoading={isFormLoading}
        openLoginForm={this.handleOpenLoginForm}
        phone={formattedPhone}
        sendNotifyCodeAgain={this.handleGetNewCode}
        timerForNextRequest={timeoutValue}
      />
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  timerForNextRequest: timerForNextRequestSelector(state),
  formattedPhone: loginFormPhoneFormattedSelector(state),
  phone: loginFormPhonePureSelector(state),
  initialFormValues: acceptCodeFormFormValuesSelector(state),
  isFormLoading: acceptCodeFormIsLoadingSelector(state),
  externalError: acceptCodeFormExternalErrorSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      closeAcceptForm: closeAcceptFormAction,
      openLoginModal: openLoginFormAction,
      sendOTP: fetchAcceptCodeActionSaga,
      getNotifyCodeAgain: fetchPhoneNumberActionSaga,
      setTimer: setTimerAction,
      removeExternalErrorAcceptForm: removeExternalErrorAcceptFormAction,
      setAcceptCode: setAcceptCodeAction,
      dispatch,
    },
    dispatch,
  );

export const ConnectedAcceptCodeForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedContainer);
