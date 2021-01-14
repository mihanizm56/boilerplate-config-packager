import { Reducer } from 'redux';
import { PokemonType } from '../../_types';
import {
  START_POKEMON_LOADING,
  STOP_POKEMON_LOADING,
  FINISH_INIT_LOADING,
  SET_DATA,
} from './actions';
import { PokemonStateType } from './types';

export const initialState: PokemonStateType = {
  data: [],
  isLoading: false,
  initialLoaded: false,
};

type ActionsType = {
  type: string;
  payload: Array<PokemonType>;
};

const reducer: Reducer = (
  state: PokemonStateType = initialState,
  { type, payload }: ActionsType,
): PokemonStateType => {
  switch (type) {
    case START_POKEMON_LOADING:
      return { ...state, isLoading: true };
    case STOP_POKEMON_LOADING:
      return { ...state, isLoading: false };
    case FINISH_INIT_LOADING:
      return { ...state, initialLoaded: true };
    case SET_DATA:
      return { ...state, data: payload };

    default:
      return state;
  }
};

export default reducer;
