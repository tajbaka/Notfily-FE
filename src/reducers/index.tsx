import { combineReducers } from "redux";
import adminSchedule from "./admin-schedule";
import auth from "./auth";
import global from "./global";
import settings from "./settings";
import userSchedule from "./user-schedule";

export default combineReducers({
  auth,
  adminSchedule,
  global,
  settings,
  userSchedule
});
