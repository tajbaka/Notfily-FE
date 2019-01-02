// import * as firebase from "firebase/app";
import "firebase/auth";

import { UPDATE_SETTINGS } from "./types";

export const updateSettings = (ref: any) => {
  const { settings, dispatch } = ref;
  const newSettings = JSON.parse(JSON.stringify(settings));
  dispatch({ type: UPDATE_SETTINGS, payload: newSettings });
};