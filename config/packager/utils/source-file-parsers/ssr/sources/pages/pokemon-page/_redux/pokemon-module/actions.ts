import { Action, BaseAction } from '@wildberries/redux-core-modules';
import { PokemonType } from '../../_types';

export const START_POKEMON_LOADING = 'START_POKEMON_LOADING';
export const startPokemonLoadingAction: BaseAction = () => ({
  type: START_POKEMON_LOADING,
});

export const STOP_POKEMON_LOADING = 'STOP_POKEMON_LOADING';
export const stopPokemonLoadingAction: BaseAction = () => ({
  type: STOP_POKEMON_LOADING,
});

export const FINISH_INIT_LOADING = 'FINISH_INIT_LOADING';
export const finishPokemonLoadingAction: BaseAction = () => ({
  type: FINISH_INIT_LOADING,
});

export const SET_DATA = 'SET_DATA';
export const setPokemonDataAction: Action<PokemonType> = (payload) => ({
  type: SET_DATA,
  payload,
});

export const FETCH_DATA_SAGA = 'FETCH_DATA_SAGA';
export const fetchPokemonActionSaga: BaseAction = () => ({
  type: FETCH_DATA_SAGA,
});
