/* eslint-disable @typescript-eslint/camelcase */
import { put, call, select } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { getDeviceUser } from '@/_pages/wb-eu-passport/_utils/get-device-user';
import { getBrowserInfo } from '@/_pages/wb-eu-passport/_utils/get-browser-info';
import { loginRequest } from '@/api/requests/login';
import { centralLoginRequest } from '@/api/requests/central-login';
import { grantRequest } from '@/api/requests/grant';
import {
  setExternalErrorAcceptFormAction,
  setAcceptFormStartLoadingAction,
  setAcceptFormStopLoadingAction,
} from '../actions';
import { authorizationTokenSelector } from '../../login-app-module';

export function* acceptCodeWorkerSaga(notifyCode: string) {
  try {
    yield put(setAcceptFormStartLoadingAction());

    const browserInfo = getBrowserInfo();
    const device = getDeviceUser();

    const token = yield select(authorizationTokenSelector);

    const { error: loginError, errorText: loginErrorText } = yield call(
      loginRequest,
      {
        options: {
          notify_code: notifyCode,
        },
        token,
        device,
        version: browserInfo,
      },
    );

    if (loginError) {
      throw new Error(loginErrorText);
    }

    const { error: grantError, data: grantData } = yield call(grantRequest);

    if (!grantError) {
      yield call(centralLoginRequest, {
        token: grantData.token,
        device,
        version: browserInfo,
      });
    }

    if (Boolean(token) && token !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const inviteToken = urlParams.get('invite_token');
      const redirectUrl = urlParams.get('redirect_url');

      if (redirectUrl) {
        if (inviteToken) {
          window.location.replace(`${redirectUrl}?invite_token=${inviteToken}`);

          return;
        }

        window.location.replace(redirectUrl);
      }
    }
  } catch (error) {
    yield put(batchActions([setExternalErrorAcceptFormAction(error.message)]));
  } finally {
    yield put(setAcceptFormStopLoadingAction());
  }
}
