import { Action, BaseAction } from '@wildberries/redux-core-modules';

export const FETCH_ACCEPT_CODE_ACTION_SAGA = 'FETCH_ACCEPT_CODE_ACTION_SAGA';
export const fetchAcceptCodeActionSaga: Action<string> = (payload) => ({
  type: FETCH_ACCEPT_CODE_ACTION_SAGA,
  payload,
});

export const SET_EXTERNAL_ACCEPT_ERROR = 'SET_EXTERNAL_ACCEPT_ERROR';
export const setExternalErrorAcceptFormAction: Action<number> = (payload) => ({
  type: SET_EXTERNAL_ACCEPT_ERROR,
  payload,
});

export const REMOVE_EXTERNAL_ACCEPT_ERROR = 'REMOVE_EXTERNAL_ACCEPT_ERROR';
export const removeExternalErrorAcceptFormAction: BaseAction = () => ({
  type: REMOVE_EXTERNAL_ACCEPT_ERROR,
});

export const SET_ACCEPT_FORM_IS_LOADING_START =
  'SET_ACCEPT_FORM_IS_LOADING_START';
export const setAcceptFormStartLoadingAction: BaseAction = () => ({
  type: SET_ACCEPT_FORM_IS_LOADING_START,
});

export const SET_ACCEPT_FORM_IS_LOADING_STOP =
  'SET_ACCEPT_FORM_IS_LOADING_STOP';
export const setAcceptFormStopLoadingAction: BaseAction = () => ({
  type: SET_ACCEPT_FORM_IS_LOADING_STOP,
});

export const SET_ACCEPT_CODE = 'SET_ACCEPT_CODE';
export const setAcceptCodeAction: Action<number> = (payload) => ({
  type: SET_ACCEPT_CODE,
  payload,
});

export const RESET_ACCEPT_CODE = 'RESET_ACCEPT_CODE';
export const resetAcceptCodeAction: Action<number> = (payload) => ({
  type: RESET_ACCEPT_CODE,
  payload,
});
