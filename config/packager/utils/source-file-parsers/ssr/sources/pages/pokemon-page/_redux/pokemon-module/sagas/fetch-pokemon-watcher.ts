import { take, fork } from 'redux-saga/effects';
import { FETCH_DATA_SAGA } from '../actions';
import { fetchPokemonWorkerSaga } from './fetch-pokemon-worker';

export const FETCH_POKEMON_SAGA_NAME = 'FETCH_POKEMON_SAGA_NAME';
export function* fetchPokemonWatcherSaga() {
  while (true) {
    yield take(FETCH_DATA_SAGA);
    yield fork(fetchPokemonWorkerSaga);
  }
}
