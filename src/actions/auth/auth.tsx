import * as firebase from "firebase/app";
import "firebase/auth";
import { ActionCreator } from "redux";

import { LoginState } from "../../components";
import { validateEmail, validatePassword } from "./../functions";

import {
  CREATE_ACCOUNT_PASSWORD_CHANGED,
  CREATE_ACCOUNT_USERNAME_CHANGED,
  FORGOT_PASSWORD_CHANGED,
  GET_DATA,
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
} from "./types";

export const onUsernameChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: USERNAME_CHANGED, payload: text });
  };
};

export const onPasswordChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: PASSWORD_CHANGED, payload: text });
  };
};

export const onForgotPasswordChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: FORGOT_PASSWORD_CHANGED, payload: text });
  };
};

export const onCreateAccountPasswordChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: CREATE_ACCOUNT_PASSWORD_CHANGED, payload: text });
  };
};

export const onCreateAccountUsernameChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: CREATE_ACCOUNT_USERNAME_CHANGED, payload: text });
  };
};

export const onLoginAction: ActionCreator<any> = (
  email: string,
  password: string
) => {
  return (dispatch: any) => {
    dispatch({ type: LOGIN_USER });
    if (password.length > 0) {
      firebase.auth().signInWithEmailAndPassword(email, password).then((user: any) => {
        loginUserSuccess(dispatch, user);
        getData(dispatch, email, password)
      })
      .catch((error: any) => {
        loginUserFail(dispatch, error.message);
      });
    } else {
      loginUserFail(dispatch, "Enter a valid Password");
    }
  };
};

export const getData = (dispatch: any, email: string, password: string) => {
  const currentUser = firebase.auth().currentUser;
  if(currentUser){
    console.log(email, password, currentUser.uid)
  }
  firebase.database().ref('/users').once('value').then((snapshot) => {
    console.log(snapshot, 'snap');
    dispatch({ type: GET_DATA });
  }).catch(err => {
    console.log(err, 'error')
  });
};

export const logoutUserAction: ActionCreator<any> = (authString) => {
  return (dispatch: any) => {
    localStorage.removeItem(authString ? authString : "auth");
    dispatch({ type: LOGOUT_USER });
  };
};

export const onLoginStateAction: ActionCreator<any> = (
  loginState: LoginState
) => {
  return (dispatch: any) => {
    dispatch({ type: LOGIN_STATE_ACTION, payload: loginState });
  };
};

export const onResetAction: ActionCreator<any> = email => {
  return (dispatch: any) => {
    if (validateEmail(email)) {
      dispatch({
        type: LOGIN_STATE_ACTION,
        payload: LoginState.ThankYou
      });
    } 
    else {
      loginUserFail(dispatch, "Enter a Valid Email");
    }
  };
};

export const onCreateAction: ActionCreator<any> = (email, password, authString) => {
  return (dispatch: any) => {
    const emailValidated = validateEmail(email);
    const passwordValidated = validatePassword(password)
    if (emailValidated && passwordValidated) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((user: any) => {
        loginUserSuccess(dispatch, user, authString);
        getData(dispatch, email, password)
      })
      .catch((error: any) => {
        loginUserFail(dispatch, error.message);
      });
    } 
    if(!emailValidated) {
      loginUserFail(dispatch, "Enter a Valid Email");
    }
    else {
      dispatch({
        type: VALIDATE_USERNAME
      });
    }
    if(!passwordValidated){
      loginPasswordFail(dispatch, "Enter a password longer than 5 characters");
    }
    else {
      dispatch({
        type: VALIDATE_PASSWORD
      });
    }
  };
};

export const onNextAction: ActionCreator<any> = email => {
  return (dispatch: any) => {
    if (validateEmail(email)) {
      dispatch({
        type: LOGIN_STATE_ACTION,
        payload: LoginState.EnteringPassword
      });
    } else {
      loginUserFail(dispatch, "Enter a Valid Email");
    }
  };
};

const loginUserFail = (dispatch: any, error: string) => {
  dispatch({
    type: LOGIN_USER_ERROR,
    payload: error
  });
};

const loginPasswordFail = (dispatch: any, error: string) => {
  dispatch({
    type: LOGIN_PASSWORD_ERROR,
    payload: error
  });
};

const loginUserSuccess = (dispatch: any, user: string, authString?:string) => {
  localStorage.setItem(authString ? authString : 'auth', JSON.stringify(user));
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};
