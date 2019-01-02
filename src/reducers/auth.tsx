import {
  CREATE_ACCOUNT_PASSWORD_CHANGED,
  CREATE_ACCOUNT_USERNAME_CHANGED,
  FORGOT_PASSWORD_CHANGED,
  LOGIN_PASSWORD_ERROR,
  LOGIN_STATE_ACTION,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  VALIDATE_PASSWORD,
  VALIDATE_USERNAME
} from "../actions";

import { LoginState } from "../components";

const INITIAL_STATE = {
  error: "",
  passwordError: '',
  loading: false,
  loginState: LoginState.EnteringUsername,
  usernameValue: "",
  passwordValue: "",
  forgotPasswordValue: "",
  createAccountUsernameValue: '',
  createAccountPasswordValue: '',
  authenticated: false
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case VALIDATE_PASSWORD:
      return { ...state, passwordError: '' };
    case VALIDATE_USERNAME:
      return { ...state, error: '' };
    case CREATE_ACCOUNT_USERNAME_CHANGED:
      return { ...state, createAccountUsernameValue: action.payload };
    case CREATE_ACCOUNT_PASSWORD_CHANGED:
      return { ...state, createAccountPasswordValue: action.payload };
    case FORGOT_PASSWORD_CHANGED:
      return { ...state, forgotPasswordValue: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, passwordValue: action.payload };
    case USERNAME_CHANGED:
      return { ...state, usernameValue: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_ERROR:
      return { ...state, error: action.payload, loading: false };
    case LOGIN_PASSWORD_ERROR:
      return { ...state, passwordError: action.payload, loading: false };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        error: "",
        passwordError: '',
        loading: false
      };
    case LOGIN_STATE_ACTION:
      return { ...state, error: "", loginState: action.payload };
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
