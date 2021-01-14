import { IResponse, PureRestRequest } from '@mihanizm56/fetch-api';
import { makeRequestConfig } from './make-request-config';

export const getPokemonListRequest = (): Promise<IResponse> =>
  new PureRestRequest().getRequest(makeRequestConfig());
