import { createSelector } from 'reselect';
import { acceptConditionSelector } from '../ui-module';
import { initialState } from './reducer';
import { acceptCodeFormModuleReducerName } from './constants';
import { AcceptCodeFormStorage, AcceptCodeFormStoragePart } from './_types';

const acceptCodeFormStorageSelector = (
  store: AcceptCodeFormStoragePart,
): AcceptCodeFormStorage =>
  store[acceptCodeFormModuleReducerName] || initialState;

export const acceptCodeFormPhoneSelector = createSelector(
  [acceptCodeFormStorageSelector],
  ({ code }: AcceptCodeFormStorage) => code,
);

export const acceptCodeFormExternalErrorSelector = createSelector(
  [acceptCodeFormStorageSelector],
  ({ externalError }: AcceptCodeFormStorage) => externalError,
);

export const acceptCodeFormIsLoadingSelector = createSelector(
  [acceptCodeFormStorageSelector],
  ({ isLoading }: AcceptCodeFormStorage) => isLoading,
);

export const acceptCodeFormFormValuesSelector = createSelector(
  [acceptCodeFormPhoneSelector, acceptConditionSelector],
  (code: string, acceptCondition: boolean) => ({
    code,
    acceptCondition,
  }),
);
