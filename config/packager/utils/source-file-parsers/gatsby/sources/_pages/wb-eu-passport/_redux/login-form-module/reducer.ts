import { LoginByPhoneFormValuesType } from '../../_components/connected-auth-modal/_components/connected-login-by-phone-form/types';
import { LoginFormStorage } from './_types';
import {
  SET_EXTERNAL_LOGIN_ERROR,
  REMOVE_EXTERNAL_LOGIN_ERROR,
  SET_LOGIN_FORM_IS_LOADING_START,
  SET_LOGIN_FORM_IS_LOADING_STOP,
  SET_PHONE_VALUE,
} from './actions';

type AuthorizationActionsType = {
  type: string;
  payload?: boolean | string | LoginByPhoneFormValuesType;
};

export const initialState: LoginFormStorage = {
  externalError: '',
  isLoading: false,
  phone: '',
};

const reducer = (
  state = initialState,
  { type, payload }: AuthorizationActionsType,
) => {
  switch (type) {
    case SET_LOGIN_FORM_IS_LOADING_START:
      return { ...state, isLoading: true };
    case SET_LOGIN_FORM_IS_LOADING_STOP:
      return { ...state, isLoading: false };
    case SET_EXTERNAL_LOGIN_ERROR:
      return { ...state, externalError: payload };
    case REMOVE_EXTERNAL_LOGIN_ERROR:
      return { ...state, externalError: '' };
    case SET_PHONE_VALUE:
      return { ...state, phone: payload };

    default:
      return state;
  }
};

export default reducer;
