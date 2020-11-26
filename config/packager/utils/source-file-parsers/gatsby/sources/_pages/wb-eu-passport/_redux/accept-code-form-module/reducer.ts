/* eslint-disable @typescript-eslint/camelcase */
import { AcceptCodeFormDataType } from '../../_components/connected-auth-modal/_components/connected-accept-code-form/_types';
import { AcceptCodeFormStorage } from './_types';
import {
  SET_ACCEPT_FORM_IS_LOADING_START,
  SET_ACCEPT_FORM_IS_LOADING_STOP,
  SET_EXTERNAL_ACCEPT_ERROR,
  REMOVE_EXTERNAL_ACCEPT_ERROR,
  SET_ACCEPT_CODE,
  RESET_ACCEPT_CODE,
} from './actions';

type AuthorizationActionsType = {
  type: string;
  payload?: boolean | string | Omit<AcceptCodeFormDataType, 'acceptCondition'>;
};

export const initialState: AcceptCodeFormStorage = {
  externalError: '',
  isLoading: false,
  code: '',
};

const reducer = (
  state = initialState,
  { type, payload }: AuthorizationActionsType,
) => {
  switch (type) {
    case SET_ACCEPT_FORM_IS_LOADING_START:
      return { ...state, isLoading: true };
    case SET_ACCEPT_FORM_IS_LOADING_STOP:
      return { ...state, isLoading: false };
    case SET_EXTERNAL_ACCEPT_ERROR:
      return { ...state, externalError: payload };
    case REMOVE_EXTERNAL_ACCEPT_ERROR:
      return { ...state, externalError: null };
    case SET_ACCEPT_CODE:
      return { ...state, formData: payload };
    case RESET_ACCEPT_CODE:
      return {
        ...state,
        code: '',
      };

    default:
      return state;
  }
};

export default reducer;
