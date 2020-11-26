import { BaseAction, Action } from '@wildberries/redux-core-modules';

export const START_PAGE_LOADING = 'START_PAGE_LOADING';
export const startAppLoadingAction: BaseAction = () => ({
  type: START_PAGE_LOADING,
});

export const STOP_PAGE_LOADING = 'STOP_PAGE_LOADING';
export const stopAppLoadingAction: BaseAction = () => ({
  type: STOP_PAGE_LOADING,
});

export const SET_APP_ERROR_STATE = 'SET_APP_ERROR_STATE';
export const setAppErrorAction: BaseAction = () => ({
  type: SET_APP_ERROR_STATE,
});

export const REMOVE_APP_ERROR_STATE = 'REMOVE_APP_ERROR_STATE';
export const removeAppErrorAction: BaseAction = () => ({
  type: REMOVE_APP_ERROR_STATE,
});

export const SET_ACCEPT_CONDITION = 'SET_ACCEPT_CONDITION';
export const setAcceptConditionAction: Action<boolean> = (payload) => ({
  type: SET_ACCEPT_CONDITION,
  payload,
});

export const SET_LOGIN_FORM_OPENED = 'SET_LOGIN_FORM_OPENED';
export const openLoginFormAction: BaseAction = () => ({
  type: SET_LOGIN_FORM_OPENED,
});

export const SET_LOGIN_FORM_CLOSED = 'SET_LOGIN_FORM_CLOSED';
export const closeLoginFormAction: BaseAction = () => ({
  type: SET_LOGIN_FORM_CLOSED,
});

export const SET_ACCEPT_FORM_OPENED = 'SET_ACCEPT_FORM_OPENED';
export const openAcceptFormAction: BaseAction = () => ({
  type: SET_ACCEPT_FORM_OPENED,
});

export const SET_ACCEPT_FORM_CLOSED = 'SET_ACCEPT_FORM_CLOSED';
export const closeAcceptFormAction: BaseAction = () => ({
  type: SET_ACCEPT_FORM_CLOSED,
});

export const START_I18NEXT_LOADING = 'START_i18NEXT_LOADING';
export const starti18nextLoadingAction: BaseAction = () => ({
  type: START_I18NEXT_LOADING,
});

export const STOP_I18NEXT_LOADING = 'STOP_i18NEXT_LOADING';
export const stopi18nextLoadingAction: BaseAction = () => ({
  type: STOP_I18NEXT_LOADING,
});
