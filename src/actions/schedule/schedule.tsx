import { getUserData, updateSchedule} from "./schedule-api";

export const onGetUserData = (text: string) => {
  getUserData()
};

export const onUpdateSchedule = (schedule: any) => {
  return (dispatch: any, getState: any) => {
    updateSchedule({ dispatch, schedule });
  }
};