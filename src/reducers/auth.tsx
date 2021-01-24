import {
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ADMIN_PASSWORD_CHANGED,
  CREATE_ACCOUNT_ADMIN_NAME_CHANGED,
  ADMIN_FORGOT_PASSWORD_CHANGED,
  LOGIN_STATE_ACTION,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ADMIN_PASSWORD_CHANGED,
  ADMIN_NAME_CHANGED,
  VALIDATE_SIGN_IN,
  VALIDATE_CREATE_ACCOUNT
} from "../actions";

import { LoginState } from "../components";

const INITIAL_STATE = {
  auth: null,
  signinError: '',
  loginState: LoginState.EnteringUsername,
  signinUsernameValue: "",
  signinPasswordValue: "",
  forgotPasswordValue: "",
  createAccountUsernameValue: '',
  createAccountPasswordValue: '',
  authenticated: false
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case VALIDATE_SIGN_IN:
      return { ...state, signinError: '' };
    case VALIDATE_CREATE_ACCOUNT:
      return { ...state, signinError: '' };
    case CREATE_ACCOUNT_ERROR:
      return { ...state, createAccountError: action.payload };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        authenticated: true,
        signinError: "",
        createAccountError: '',
        loading: false
      };
    case CREATE_ACCOUNT_ADMIN_NAME_CHANGED:
      return { ...state, createAccountUsernameValue: action.payload };
    case CREATE_ACCOUNT_ADMIN_PASSWORD_CHANGED:
      return { ...state, createAccountPasswordValue: action.payload };
    case ADMIN_FORGOT_PASSWORD_CHANGED:
      return { ...state, forgotPasswordValue: action.payload };
    case ADMIN_PASSWORD_CHANGED:
      return { ...state, signinPasswordValue: action.payload };
    case ADMIN_NAME_CHANGED:
      return { ...state, signinUsernameValue: action.payload };
    case LOGIN_ERROR:
      return { ...state, signinError: action.payload };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        signinError: "",
        createAccountError: '',
        loading: false
      };
    case LOGIN_STATE_ACTION:
      return { ...state, signinError: "", loginState: action.payload };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
