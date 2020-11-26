import { LoginAppStorage } from './_types';
import { SET_TOKEN, SET_TIMER, SET_CODE_LENGTH } from './actions';

type AuthorizationActionsType = {
  type: string;
  payload?: string | number;
};

export const initialState: LoginAppStorage = {
  token: '',
  timerForNextRequest: 0,
  codeLength: 6,
};

const reducer = (
  state = initialState,
  { type, payload }: AuthorizationActionsType,
) => {
  switch (type) {
    case SET_TOKEN:
      return { ...state, token: payload };
    case SET_TIMER:
      return { ...state, timerForNextRequest: payload };
    // todo uncomment if there will be the backend feature
    case SET_CODE_LENGTH:
      return { ...state, codeLength: payload };

    default:
      return state;
  }
};

export default reducer;
