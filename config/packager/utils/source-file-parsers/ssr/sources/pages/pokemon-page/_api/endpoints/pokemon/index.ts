export const getPokemonsEndpoint = () => {
  if (__CLIENT__) {
    return '/pokemons';
  }

  if (__DEV__) {
    return `http://localhost:${env.PORT}/pokemons`;
  }

  return `${env.POKEMON_ENDPOINT}/pokemons`;
};
