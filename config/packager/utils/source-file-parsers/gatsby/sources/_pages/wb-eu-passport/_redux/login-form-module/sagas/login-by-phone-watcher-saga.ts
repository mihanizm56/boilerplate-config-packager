import { take, fork } from 'redux-saga/effects';
import { FormParamsType } from '@/_pages/wb-eu-passport/_types';
import { FETCH_PHONE_NUMBER_ACTION_SAGA } from '../actions';
import { loginByPhoneWorkerSaga } from './login-by-phone-worker-saga';

export function* loginByPhoneWatcherSaga() {
  while (true) {
    const { payload }: { payload: FormParamsType } = yield take(
      FETCH_PHONE_NUMBER_ACTION_SAGA,
    );

    yield fork(loginByPhoneWorkerSaga, payload);
  }
}
