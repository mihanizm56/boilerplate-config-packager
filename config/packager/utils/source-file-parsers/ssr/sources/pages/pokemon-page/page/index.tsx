import React from 'react';
import { connect } from 'react-redux';
import {
  pokemonInitialLoadedSelector,
  pokemonIsDataSelector,
  pokemonIsLoadingSelector,
} from '../_redux/pokemon-module';
import { PokemonType } from '../_types';

type PropsType = {
  isInitialLoaded: boolean;
  isLoading: boolean;
  pokemonList: Array<PokemonType>;
};

const WrappedComponent = ({
  pokemonList,
  isInitialLoaded,
  isLoading,
}: PropsType) => {
  if (isLoading) {
    return <div>isLoading...</div>;
  }

  if (!isInitialLoaded) {
    return <div>Not Initial Loaded</div>;
  }

  return (
    <ul>
      {pokemonList.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  pokemonList: pokemonIsDataSelector(state),
  isInitialLoaded: pokemonInitialLoadedSelector(state),
  isLoading: pokemonIsLoadingSelector(state),
});

export const Page = connect(mapStateToProps)(WrappedComponent);
