import { cancel, take, select, fork } from 'redux-saga/effects';
import { FETCH_ACCEPT_CODE_ACTION_SAGA } from '../actions';
import { codeLengthToValidateSelector } from '../../login-app-module';
import { acceptCodeWorkerSaga } from './accept-code-worker-saga';

export function* acceptCodeWatcherSaga({ dispatch }) {
  const codeLengthToValidate = yield select(codeLengthToValidateSelector);
  let lastTask;

  while (true) {
    const { payload }: { payload: string } = yield take(
      FETCH_ACCEPT_CODE_ACTION_SAGA,
    );

    if (lastTask) {
      yield cancel(lastTask);
    }

    if (payload.length === codeLengthToValidate) {
      lastTask = yield fork(acceptCodeWorkerSaga, payload);
    }
  }
}
