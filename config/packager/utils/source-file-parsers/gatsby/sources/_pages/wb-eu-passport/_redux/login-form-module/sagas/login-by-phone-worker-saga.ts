/* eslint-disable @typescript-eslint/camelcase */
import { put, call } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { FormParamsType } from '@/_pages/wb-eu-passport/_types';
import { loginByPhoneRequest } from '@/api/requests/login-by-phone';
import { resourceInfoRequest } from '@/api/requests/resource-info';
import {
  setLoginFormStopLoadingAction,
  setExternalErrorLoginFormAction,
  setLoginFormStartLoadingAction,
  setPhoneValueAction,
} from '../actions';
import {
  openAcceptFormAction,
  closeLoginFormAction,
  setAcceptConditionAction,
} from '../../ui-module';
import {
  setAcceptFormStopLoadingAction,
  setAcceptFormStartLoadingAction,
  removeExternalErrorAcceptFormAction,
} from '../../accept-code-form-module';
import {
  setTimerAction,
  setCodeLengthAction,
  setTokenAction,
} from '../../login-app-module';
import { getSeconds } from '../_utils';

// be careful - this saga is re-used in case getting new code
// if you will need to make more logic - split it with that into two different sagas
export function* loginByPhoneWorkerSaga({
  phone,
  acceptCondition,
}: FormParamsType) {
  try {
    yield put(
      batchActions([
        // set accept-form loading start because we will re-use this saga to get new code
        setAcceptFormStartLoadingAction(),
        setLoginFormStartLoadingAction(),
        setPhoneValueAction(phone),
        setAcceptConditionAction(acceptCondition),
        removeExternalErrorAcceptFormAction(),
      ]),
    );

    const phoneFormatted = phone.replace(/\D/g, '');

    const { error, errorText, data } = yield call(loginByPhoneRequest, {
      phone: phoneFormatted,
      is_terms_and_conditions_accepted: acceptCondition,
    });

    if (error) {
      throw new Error(errorText);
    }

    const {
      error: resourceError,
      errorText: resourceErrorText,
      data: resourceData,
    } = yield call(resourceInfoRequest);

    if (resourceError) {
      throw new Error(resourceErrorText);
    }
    const formattedTimeInSeconds = getSeconds(
      resourceData.resource.time_between_sms,
    );

    yield put(
      batchActions([
        setTimerAction(formattedTimeInSeconds),
        setCodeLengthAction(resourceData.resource.code_length),
        setTokenAction(data.token),
        closeLoginFormAction(),
        setLoginFormStopLoadingAction(),
        setAcceptFormStopLoadingAction(),
        openAcceptFormAction(),
      ]),
    );
  } catch (error) {
    yield put(
      batchActions([
        setExternalErrorLoginFormAction(error.message),
        setLoginFormStopLoadingAction(),
        setAcceptFormStopLoadingAction(),
      ]),
    );
  }
}
