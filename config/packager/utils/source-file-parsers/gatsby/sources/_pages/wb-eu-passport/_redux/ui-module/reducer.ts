import {
  START_PAGE_LOADING,
  STOP_PAGE_LOADING,
  SET_APP_ERROR_STATE,
  REMOVE_APP_ERROR_STATE,
  SET_ACCEPT_CONDITION,
  SET_LOGIN_FORM_OPENED,
  SET_LOGIN_FORM_CLOSED,
  SET_ACCEPT_FORM_OPENED,
  SET_ACCEPT_FORM_CLOSED,
  START_I18NEXT_LOADING,
  STOP_I18NEXT_LOADING,
} from './actions';
import { IUIState } from './types';

export const initialState: IUIState = {
  isLoginFormOpened: true,
  isAcceptCodeFormOpened: false,
  pageIsLoadingState: false,
  isAppError: false,
  acceptCondition: true,
  i18nextIsLoadingState: false, // true потому что сначала надо загрузить словарь
  // и не дать отрисоваться остальному контенту
};

type ActionsType = {
  type: string;
  payload?: boolean;
};

const reducer = (
  state: IUIState = initialState,
  { type, payload }: ActionsType,
): IUIState => {
  switch (type) {
    case START_PAGE_LOADING:
      return { ...state, pageIsLoadingState: true };
    case STOP_PAGE_LOADING:
      return { ...state, pageIsLoadingState: false };
    case SET_APP_ERROR_STATE:
      return { ...state, isAppError: true };
    case REMOVE_APP_ERROR_STATE:
      return { ...state, isAppError: false };
    case SET_ACCEPT_CONDITION:
      return { ...state, acceptCondition: payload };
    case SET_LOGIN_FORM_OPENED:
      return { ...state, isLoginFormOpened: true };
    case SET_LOGIN_FORM_CLOSED:
      return { ...state, isLoginFormOpened: false };
    case SET_ACCEPT_FORM_OPENED:
      return { ...state, isAcceptCodeFormOpened: true };
    case SET_ACCEPT_FORM_CLOSED:
      return { ...state, isAcceptCodeFormOpened: false };
    case START_I18NEXT_LOADING:
      return { ...state, i18nextIsLoadingState: true };
    case STOP_I18NEXT_LOADING:
      return { ...state, i18nextIsLoadingState: false };

    default:
      return state;
  }
};

export default reducer;
