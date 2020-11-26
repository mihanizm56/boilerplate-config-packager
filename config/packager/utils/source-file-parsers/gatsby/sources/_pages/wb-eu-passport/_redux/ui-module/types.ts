import { reducerUIName } from './constants';

export interface IUIState {
  pageIsLoadingState: boolean;
  isAppError: boolean;
  acceptCondition: boolean;
  isLoginFormOpened: boolean;
  isAcceptCodeFormOpened: boolean;
  i18nextIsLoadingState: boolean;
}

export interface IUIStatePart {
  [reducerUIName]: IUIState;
}
