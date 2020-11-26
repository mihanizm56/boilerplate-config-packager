import { createSelector } from 'reselect';
import { LoginAppStorage, LoginAppStoragePart } from './_types';
import { loginAppModuleReducerName } from './constants';
import { initialState } from './reducer';

export const loginStorageSelector = (
  store: LoginAppStoragePart,
): LoginAppStorage => store[loginAppModuleReducerName] || initialState;

export const authorizationTokenSelector = createSelector(
  [loginStorageSelector],
  ({ token }: LoginAppStorage) => token,
);

export const timerForNextRequestSelector = createSelector(
  [loginStorageSelector],
  ({ timerForNextRequest }: LoginAppStorage) => timerForNextRequest,
);

export const codeLengthToValidateSelector = createSelector(
  [loginStorageSelector],
  ({ codeLength }: LoginAppStorage) => codeLength,
);
