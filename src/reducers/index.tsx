import { combineReducers } from "redux";
import auth from "./auth";
import global from "./global";
import schedule from "./schedule";
import settings from "./settings";

export default combineReducers({
  auth,
  global,
  schedule,
  settings
});
