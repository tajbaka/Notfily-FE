import { LoginState } from "../";

// import { ACTIVE, DEFAULT, FINISHED, HIDE } from "src/library";

export const SIGNIN = `signin`;
export const SIGNIN_BACKGROUND = `${SIGNIN}-background`;
export const SIGNIN_WRAPPER = `${SIGNIN}-wrapper`;
export const SIGNIN_HEADER = `${SIGNIN}-header`;
export const SIGNIN_FORM_CONTAINER_OUTER = `${SIGNIN}-form-container-outer`;
export const SIGNIN_FORM_CONTAINER_INNER = `${SIGNIN}-form-container-inner`;
export const SIGNIN_FORM_WRAPPER = `${SIGNIN}-form-wrapper`;
export const SIGNIN_FOOTER = `${SIGNIN}-footer`;
export const SIGNIN_FORM = `${SIGNIN}-form`;
export const SIGNIN_FORM_HEADER = `${SIGNIN}-form-header`;
export const SIGNIN_FORM_FOOTER = `${SIGNIN}-form-footer`;
export const SIGNIN_FORM_TITLE = `${SIGNIN}-form-title`;
export const SIGNIN_FORM_SUBTITLE = `${SIGNIN}-form-subtitle`;
export const SIGNIN_FORM_ERROR = `${SIGNIN}-form-error`;
export const SIGNIN_BUTTONS_CONTAINER = `${SIGNIN}-buttons-container`;
export const SIGNIN_ACTION_BUTTON = `${SIGNIN}-action-button`;

export const ENTERING_USERNAME = `entering-username`;
export const CREATE_ACCOUNT = `create-account`;
export const ENTERING_PASSWORD = `entering-password`;
export const ENTERING_FORGOTPASSWORD = `entering-forgotpassword`;
export const THANK_YOU = `got-thank-you`;
export const ENTERYING_TWOWAYAUTH = "entering-twowayauth";

export function loginStateClass(loginState?: LoginState) {
  switch (loginState) {
    case LoginState.EnteringUsername:
      return ENTERING_USERNAME;
    case LoginState.CreateAccount:
      return CREATE_ACCOUNT;
    case LoginState.EnteringForgotPassword:
      return ENTERING_FORGOTPASSWORD;
    case LoginState.EnteringPassword:
      return ENTERING_PASSWORD;
    case LoginState.TwoWayAuth:
      return ENTERYING_TWOWAYAUTH;
    case LoginState.ThankYou:
      return THANK_YOU;
    default:
      return undefined;
  }
}