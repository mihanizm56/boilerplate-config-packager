import { PokemonType } from '../../_types';
import { MODULE_REDUCER_NAME } from './constants';

export type PokemonStateType = {
  data: Array<PokemonType>;
  isLoading: boolean;
  initialLoaded: boolean;
};

export type PokemonStatePartType = {
  [MODULE_REDUCER_NAME]: PokemonStateType;
};
