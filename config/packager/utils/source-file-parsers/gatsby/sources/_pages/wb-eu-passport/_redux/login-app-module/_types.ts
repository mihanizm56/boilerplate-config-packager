import { loginAppModuleReducerName } from './constants';

export type AuthorizationParamsType = {
  token: string;
  phone: string;
  timerForNextRequest: number;
};

export type LoginAppStorage = {
  token: string;
  timerForNextRequest: number;
  codeLength: number;
};

export type LoginAppStoragePart = {
  [loginAppModuleReducerName]: LoginAppStorage;
};
