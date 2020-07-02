import * as firebase from "firebase/app";
import 'firebase/database';

import * as axios from 'axios';


import { GET_SCHEDULES_DATA_ERROR, GET_SCHEDULES_DATA_SUCCESS, GET_SETTINGS_DATA_ERROR, GET_SETTINGS_DATA_SUCCESS, GET_USER_DATA_ERROR, GET_USER_DATA_SUCCESS } from "./types";
import { DONE_LOADING, START_LOADING } from '../global/types';

export const getAdminData = (ref: any) => {
  const { dispatch, adminUid } = ref;
  dispatch({ type: START_LOADING });
  firebase.database().ref(`/users/${adminUid}`).on('value', (snapshot: any) => {
    const adminData = snapshot.val();
    dispatch({ type: DONE_LOADING });
    if(adminData === null){
      dispatch({ type: GET_SETTINGS_DATA_ERROR, payload: 'Invalid Url' });
      dispatch({ type: GET_SCHEDULES_DATA_ERROR, payload: 'Invalid Url' });
    }
    else {
      const { settings, schedules } = adminData;
      dispatch({ type: GET_SETTINGS_DATA_SUCCESS, payload: settings });
      dispatch({ type: GET_SCHEDULES_DATA_SUCCESS, payload: schedules });
    }
  });
};

export const getUserData = (ref: any) => {
  const { dispatch, userUid, adminUid } = ref;
  dispatch({ type: START_LOADING });
  firebase.database().ref(`/users/${adminUid}/settings/users/${userUid}`).on('value', (snapshot: any) => {
    const userData = snapshot.val();
    dispatch({ type: DONE_LOADING });
    if(userData === null){
      dispatch({ type: GET_USER_DATA_ERROR, payload: 'Invalid Url' });
    }
    else {
      dispatch({ type: GET_USER_DATA_SUCCESS, payload: userData });
    }
  });
};

export const updateSettings = (ref: any) => {
  const { adminUid, dispatch, settings } = ref;
  dispatch({ type: START_LOADING });
  axios.default.post(`https://us-central1-notifly-dbce7.cloudfunctions.net/updateAdminSettings?uid=${adminUid}`, {
    settings
  });
};

export const updateSchedule = (ref: any) => {
    const { dispatch, schedules, adminUid } = ref;
    dispatch({ type: START_LOADING });
    axios.default.post(`https://us-central1-notifly-dbce7.cloudfunctions.net/updateAdminSchedule?uid=${adminUid}`, {
      schedules
    });
};

export const updateUser = (ref: any) => {
  const { dispatch, user, adminUid, userUid } = ref;
  dispatch({ type: START_LOADING });
  axios.default.post(`https://us-central1-notifly-dbce7.cloudfunctions.net/updateUser?uid=${userUid}`, {
    adminUid,
    user
  });
};