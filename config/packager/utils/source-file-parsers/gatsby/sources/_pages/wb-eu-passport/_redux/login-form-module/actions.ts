import { Action, BaseAction } from '@wildberries/redux-core-modules';
import { FormParamsType } from '../../_types';

export const FETCH_PHONE_NUMBER_ACTION_SAGA = 'FETCH_PHONE_NUMBER_ACTION_SAGA';
export const fetchPhoneNumberActionSaga: Action<FormParamsType> = (
  payload,
) => ({
  type: FETCH_PHONE_NUMBER_ACTION_SAGA,
  payload,
});

export const SET_EXTERNAL_LOGIN_ERROR = 'SET_EXTERNAL_LOGIN_ERROR';
export const setExternalErrorLoginFormAction: Action<string> = (payload) => ({
  type: SET_EXTERNAL_LOGIN_ERROR,
  payload,
});

export const REMOVE_EXTERNAL_LOGIN_ERROR = 'REMOVE_EXTERNAL_LOGIN_ERROR';
export const removeExternalErrorLoginFormAction: BaseAction = () => ({
  type: REMOVE_EXTERNAL_LOGIN_ERROR,
});

export const SET_LOGIN_FORM_IS_LOADING_START =
  'SET_LOGIN_FORM_IS_LOADING_START';
export const setLoginFormStartLoadingAction: BaseAction = () => ({
  type: SET_LOGIN_FORM_IS_LOADING_START,
});

export const SET_LOGIN_FORM_IS_LOADING_STOP = 'SET_LOGIN_FORM_IS_LOADING_STOP';
export const setLoginFormStopLoadingAction: BaseAction = () => ({
  type: SET_LOGIN_FORM_IS_LOADING_STOP,
});

export const SET_PHONE_VALUE = 'SET_PHONE_VALUE';
export const setPhoneValueAction: Action<string> = (payload) => ({
  type: SET_PHONE_VALUE,
  payload,
});
