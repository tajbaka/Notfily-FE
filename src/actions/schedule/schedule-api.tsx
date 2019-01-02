// import * as firebase from "firebase/app";
import "firebase/auth";

import { UPDATE_SCHEDULE } from "./types";

export const getUserData = () => {
  // return (dispatch: any) => {
  //   dispatch({ type: GET_USER_DATA, payload: text });
  // };
};

export const updateSchedule = (ref: any) => {
    const { schedule, dispatch } = ref;
    dispatch({ type: UPDATE_SCHEDULE, payload: schedule });
};