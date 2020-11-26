import { createSelector } from 'reselect';
import { IUIState, IUIStatePart } from './types';
import { reducerUIName } from './constants';
import { initialState } from './reducer';

export const UIStorageSelector = (store: IUIStatePart) =>
  store[reducerUIName] || initialState;

export const appIsLoadingSelector = createSelector(
  [UIStorageSelector],
  ({ pageIsLoadingState }: IUIState) => pageIsLoadingState,
);

export const isAppErrorSelector = createSelector(
  [UIStorageSelector],
  ({ isAppError }: IUIState) => isAppError,
);

export const acceptConditionSelector = createSelector(
  [UIStorageSelector],
  ({ acceptCondition }: IUIState) => acceptCondition,
);

export const loginFormIsOpenedSelector = createSelector(
  [UIStorageSelector],
  ({ isLoginFormOpened }: IUIState) => isLoginFormOpened,
);

export const acceptCodeFormIsOpenedSelector = createSelector(
  [UIStorageSelector],
  ({ isAcceptCodeFormOpened }: IUIState) => isAcceptCodeFormOpened,
);

export const geti18nextIsLoadingSelector = createSelector(
  [UIStorageSelector],
  ({ i18nextIsLoadingState }: IUIState) => i18nextIsLoadingState,
);
