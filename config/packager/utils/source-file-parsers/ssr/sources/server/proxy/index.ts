import { Express } from 'express';

export const setupProxy = (app: Express) => {
  app.get('/I18N/page-1/ru', (_, res) =>
    res.status(200).json({
      translate: {
        'test-key': 'Пример перевода 1',
      },
    }),
  );

  app.get('/I18N/page-2/ru', (_, res) =>
    res.status(200).json({
      translate: {
        'test-key': 'Пример перевода 2',
      },
    }),
  );

  app.get('/I18N/page-1/en', (_, res) =>
    res.status(200).json({
      translate: {
        'test-key': 'Translation example 1',
      },
    }),
  );

  app.get('/I18N/page-2/en', (_, res) =>
    res.status(200).json({
      translate: {
        'test-key': 'Translation example 2',
      },
    }),
  );

  app.get('/pokemons', (_, res) =>
    res.status(200).json({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
        { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
        { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
        { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
        { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
        { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
        { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
        { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' },
        { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
        { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
        { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
        { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
        { name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
        { name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/' },
        { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
        { name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/' },
      ],
    }),
  );

  // app.use(
  //   '/I18N',
  //   createProxyMiddleware({
  //     target: 'http://192.168.0.107:5001',
  //     changeOrigin: true,
  //   }),
  // );
};
