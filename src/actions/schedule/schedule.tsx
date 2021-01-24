import { getAdminData, getUserData, updateSchedule, updateSettings, updateUser } from "./schedule-api";

export const onGetUserData = (userUid: string, adminUid: string) => {
  return (dispatch: any) => {
    getUserData({ dispatch, userUid, adminUid });
  }
};

export const onGetAdminData = (adminUid: string) => {
  return (dispatch: any) => {
    getAdminData({ dispatch, adminUid });
  }
};

export const onUpdateSchedule = (schedules: any, adminUid: string) => {
  return (dispatch: any, getState: any) => {
      updateSchedule({ dispatch, schedules, adminUid });
  }
};

export const onUpdateUser = (user: any, adminUid: string, userUid: string) => {
  return (dispatch: any) => {
    updateUser({ dispatch, user, adminUid, userUid });
  }
};

export const onUpdateSettings = (settings: any, adminUid: string) => {
  return (dispatch: any) => {
    updateSettings({ dispatch, settings, adminUid });
  }
};