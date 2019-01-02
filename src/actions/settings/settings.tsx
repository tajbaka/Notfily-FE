import { updateSettings } from "./settings-api";

export const onUpdateSettings = (settings: any) => {
  return (dispatch: any, getState: any) => {
    updateSettings({ dispatch, settings });
  }
};
