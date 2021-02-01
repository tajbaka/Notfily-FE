import * as firebase from "firebase/app";
import { ActionCreator } from "redux";

import * as axios from 'axios';

import { LoginState } from "../../components";
import { validateEmail, validateName, validatePassword, validatePhone } from "./../functions";

import { updateSchedule } from '../schedule/schedule-api';

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
} from "./types";

import {
  DONE_LOADING,
  START_LOADING
} from '../global/types'

import { GET_USER_DATA_ERROR, GET_USER_DATA_SUCCESS } from "../schedule/types";

export const onUsernameChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: ADMIN_NAME_CHANGED, payload: text });
  };
};

export const onPasswordChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: ADMIN_PASSWORD_CHANGED, payload: text });
  };
};

export const onForgotPasswordChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: ADMIN_FORGOT_PASSWORD_CHANGED, payload: text });
  };
};

export const onCreateAccountPasswordChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: CREATE_ACCOUNT_ADMIN_PASSWORD_CHANGED, payload: text });
  };
};

export const onCreateAccountUsernameChanged = (text: string) => {
  return (dispatch: any) => {
    dispatch({ type: CREATE_ACCOUNT_ADMIN_NAME_CHANGED, payload: text });
  };
};

export const onLoginAction: ActionCreator<any> = (
  email: string,
  password: string
) => {
  return (dispatch: any) => {
    dispatch({ type: START_LOADING });
    if (password.length > 0) {
      firebase.auth().signInWithEmailAndPassword(email, password).then((user: any) => {
        loginSuccess(dispatch, user);
      })
      .catch((error: any) => {
        loginFail(dispatch, error.message);
      });
    } else {
      loginFail(dispatch, "Enter a valid Password");
    }
  };
};

export const logoutAction: ActionCreator<any> = (authString) => {
  return (dispatch: any) => {
    localStorage.removeItem(authString ? authString : "adminAuth");
    dispatch({ type: LOGOUT });
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
      loginFail(dispatch, "Enter a Valid Email");
    }
  };
};

export const onCreateAdmin: ActionCreator<any> = (email, password, authString, name?: string) => {
  return (dispatch: any) => {
    const emailValidated = validateEmail(email);
    const passwordValidated = validatePassword(password)
    const nameValidated = name === undefined ? true : validateName(name);
    if (emailValidated && passwordValidated) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((response: any) => {
      const uid = response.user.uid;
      dispatch({ type: START_LOADING });
        
      axios.default.get(`https://us-central1-notifly-897c7.cloudfunctions.net/createAdminAccount?uid=${uid}`)
      .then(reponse => {
        createAccountSuccess(dispatch, response, authString);
        }).catch((error: any) => {
          createAccountFail(dispatch, error.message);
        });
      }).catch(error => {
        createAccountFail(dispatch, error);
      });
    } 
    if(!nameValidated){
      createAccountFail(dispatch, "Enter your full name");
    }
    else if(!emailValidated) {
      createAccountFail(dispatch, "Enter a Valid Email");
    }
    else if(!passwordValidated){
      createAccountFail(dispatch, "Enter a password longer than 5 characters");
    }
    else if(emailValidated && passwordValidated && nameValidated){
      dispatch({
        type: VALIDATE_CREATE_ACCOUNT
      });
    }
  };
};

export const onCreateUser: ActionCreator<any> = (schedules: any, adminUid: string, userEmail: string, userPassword:string, authString:string, userName: string, userPhoneNumber: string, language: string) => {
  return (dispatch: any) => {
    const emailValidated = validateEmail(userEmail);
    const nameValidated = userName === undefined ? false : validateName(userName);
    const phoneValidated = validatePhone(userPhoneNumber);
    if (emailValidated && nameValidated && phoneValidated) {
      dispatch({ type: START_LOADING });
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((response: any) => {
      const userUid = response.user.uid;
      axios.default.post(`https://us-central1-notifly-897c7.cloudfunctions.net/createUserAccount?uid=${userUid}`, {
        adminUid,
        userEmail,
        userName,
        userPhoneNumber,
        language
      }).then(() => {
        loginSuccess(dispatch, response, authString);
        firebase.database().ref(`/users/${adminUid}/settings/users/${userUid}`).once('value').then((snapshot: any) => {
          const userData = snapshot.val();
          if(userData === null){
            dispatch({ type: GET_USER_DATA_ERROR, payload: 'Invalid Url' });
          }
          else {
            console.log(schedules, 'schedules')
            updateSchedule({ dispatch, schedules, adminUid });
            dispatch({ type: GET_USER_DATA_SUCCESS, payload: userData });
          }
        });
      })
      .catch(error => {
        loginFail(dispatch, error.message);
      });
      }).catch(error => {
        loginFail(dispatch, error.message);
      });
    } 
    if(!nameValidated){
      loginFail(dispatch, "Enter your full name");
    }
    else if(!emailValidated) {
      loginFail(dispatch, "Enter a Valid Email");
    }
    else if(!phoneValidated) {
      loginFail(dispatch, "Enter a valid area code for your phone number, Example: +579051920129");
    }
    else if(phoneValidated && emailValidated && nameValidated){
      dispatch({
        type: VALIDATE_SIGN_IN
      });
    }
  };
};

const loginFail = (dispatch: any, error: string) => {
  dispatch({ type: DONE_LOADING });
  dispatch({
    type: LOGIN_ERROR,
    payload: error
  });
};

const loginSuccess = (dispatch: any, user: string, authString?:string) => {
  localStorage.setItem(authString ? authString : 'adminAuth', JSON.stringify(user));
  dispatch({ type: DONE_LOADING });
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user
  });
};

const createAccountFail = (dispatch: any, error: string) => {
  dispatch({ type: DONE_LOADING });
  dispatch({
    type: CREATE_ACCOUNT_ERROR,
    payload: error
  });
};

const createAccountSuccess = (dispatch: any, user: string, authString?:string) => {
  localStorage.setItem(authString ? authString : 'adminAuth', JSON.stringify(user));
  dispatch({ type: DONE_LOADING });
  dispatch({
    type: CREATE_ACCOUNT_SUCCESS,
    payload: user
  });
};
