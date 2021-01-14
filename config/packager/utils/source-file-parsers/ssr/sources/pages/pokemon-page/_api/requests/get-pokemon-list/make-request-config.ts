import { IRequestParams } from '@mihanizm56/fetch-api';
import { getPokemonsEndpoint } from '../../endpoints/pokemon';
import { responseSchema } from './response-schema';

export const makeRequestConfig = (): IRequestParams => ({
  endpoint: getPokemonsEndpoint(),
  responseSchema,
  mode: 'cors',
  isErrorTextStraightToOutput: true,
});
