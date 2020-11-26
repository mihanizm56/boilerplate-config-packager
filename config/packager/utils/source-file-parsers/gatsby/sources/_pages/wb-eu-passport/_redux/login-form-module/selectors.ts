import { createSelector } from 'reselect';
import { acceptConditionSelector } from '../ui-module';
import { loginFormModuleReducerName } from './constants';
import { LoginFormStorage, LoginFormStoragePart } from './_types';
import { initialState } from './reducer';

const loginFormStorageSelector = (
  store: LoginFormStoragePart,
): LoginFormStorage => store[loginFormModuleReducerName] || initialState;

export const loginFormPhoneFormattedSelector = createSelector(
  [loginFormStorageSelector],
  ({ phone }: LoginFormStorage) => phone,
);
export const loginFormPhonePureSelector = createSelector(
  [loginFormStorageSelector],
  ({ phone }: LoginFormStorage) => phone,
);
export const loginFormExternalErrorSelector = createSelector(
  [loginFormStorageSelector],
  ({ externalError }: LoginFormStorage) => externalError,
);

export const loginFormIsLoadingSelector = createSelector(
  [loginFormStorageSelector],
  ({ isLoading }: LoginFormStorage) => isLoading,
);

export const loginFormFormValuesSelector = createSelector(
  [loginFormPhonePureSelector, acceptConditionSelector],
  (phone: string, acceptCondition: boolean) => ({
    phone,
    acceptCondition,
  }),
);
