import { put, call } from 'redux-saga/effects';
import { getPokemonListRequest } from '../../../_api/requests/get-pokemon-list';
import {
  startPokemonLoadingAction,
  stopPokemonLoadingAction,
  finishPokemonLoadingAction,
  setPokemonDataAction,
} from '../actions';

export function* fetchPokemonWorkerSaga() {
  yield put(startPokemonLoadingAction());

  try {
    const { data, error, errorText } = yield call(getPokemonListRequest);

    if (error) {
      throw new Error(errorText);
    }

    yield put(setPokemonDataAction(data.legalForms));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error in fetchPokemonWorkerSaga', error);
  } finally {
    yield put(finishPokemonLoadingAction());
    yield put(stopPokemonLoadingAction());
  }
}
