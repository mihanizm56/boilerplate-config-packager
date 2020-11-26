import { Action, BaseAction } from '@wildberries/redux-core-modules';

export const INITIAL_LOGIN_PAGE_ACTION_SAGA = 'INITIAL_LOGIN_PAGE_ACTION_SAGA';
export const initialLoginPageActionSaga: BaseAction = () => ({
  type: INITIAL_LOGIN_PAGE_ACTION_SAGA,
});

export const SET_TIMER = 'SET_TIMER';
export const setTimerAction: Action<number> = (payload) => ({
  type: SET_TIMER,
  payload,
});

export const SET_TOKEN = 'SET_TOKEN';
export const setTokenAction: Action<string> = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const SET_CODE_LENGTH = 'SET_CODE_LENGTH';
export const setCodeLengthAction: Action<number> = (payload) => ({
  type: SET_CODE_LENGTH,
  payload,
});
