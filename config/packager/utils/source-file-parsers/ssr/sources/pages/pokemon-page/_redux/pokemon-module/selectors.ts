import { createSelector } from 'reselect';
import { MODULE_REDUCER_NAME } from './constants';
import { initialState } from './reducer';
import { PokemonStatePartType, PokemonStateType } from './types';

const StorageSelector = (store: PokemonStatePartType) =>
  store[MODULE_REDUCER_NAME] || initialState;

export const pokemonInitialLoadedSelector = createSelector(
  [StorageSelector],
  ({ initialLoaded }: PokemonStateType) => initialLoaded,
);

export const pokemonIsLoadingSelector = createSelector(
  [StorageSelector],
  ({ isLoading }: PokemonStateType) => isLoading,
);

export const pokemonIsDataSelector = createSelector(
  [StorageSelector],
  ({ data }: PokemonStateType) => data,
);
