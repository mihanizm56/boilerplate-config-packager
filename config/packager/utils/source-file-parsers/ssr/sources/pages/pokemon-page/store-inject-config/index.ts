import { StoreInjectConfig } from '@wildberries/redux-core-modules';
import { getPokemonListRequest } from '../_api/requests/get-pokemon-list';
import pokemonStorage, {
  FETCH_POKEMON_SAGA_NAME,
  fetchPokemonWatcherSaga,
  MODULE_REDUCER_NAME as pokemonModuleReducerName,
  startPokemonLoadingAction,
  stopPokemonLoadingAction,
  finishPokemonLoadingAction,
  setPokemonDataAction,
  pokemonInitialLoadedSelector,
} from '../_redux/pokemon-module';

export const storeInjectConfig: StoreInjectConfig = {
  sagasToInject: [
    {
      name: FETCH_POKEMON_SAGA_NAME,
      saga: fetchPokemonWatcherSaga,
    },
  ],
  reducersToInject: [
    {
      name: pokemonModuleReducerName,
      reducer: pokemonStorage,
    },
  ],
  initialLoadManagerConfig: {
    requestConfigList: [
      {
        request: getPokemonListRequest,
        loadingStartAction: startPokemonLoadingAction,
        loadingStopAction: stopPokemonLoadingAction,
        actionSuccess: setPokemonDataAction,
        responseDataFormatter: ({ results }) => results,
        initialLoadingFinishAction: finishPokemonLoadingAction,
        selectorsCheckInitialFetched: [pokemonInitialLoadedSelector],
      },
    ],
  },
};
