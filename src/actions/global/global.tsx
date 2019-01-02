import { getProfileData, navigate, toggleMobileSideBar, toggleProfileStatus, toggleRightPanel, updateDeviceType, updateToolBar, updateWindowHeight, updateWindowWidth } from "./global-api";

export const onUpdateWindowWidth = (width: number) => {
  return (dispatch: any, getState: any) => {
    updateWindowWidth({ dispatch, width });
  };
};

export const onUpdateDeviceType = () => {
  return (dispatch: any) => {
    updateDeviceType({ dispatch });
  };
};

export const onUpdateWindowHeight = (height: number) => {
  return (dispatch: any, getState: any) => {
    updateWindowHeight({ dispatch, height });
  };
};

export const onUpdateToolBar = (topBarProps: any) => {
  return (dispatch: any, getState: any) => {
    updateToolBar({ dispatch, topBarProps });
  };
};

export const onGetProfileData = () => {
  return (dispatch: any, getState: any) => {
    getProfileData({ dispatch });
  };
};

export const onToggleProfileStatus = () => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const profileData = state.global.profileData;
    toggleProfileStatus({ dispatch, profileData });
  };
};

export const onToggleMobileSideBar = () => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const mobileSideBarActive = state.global.mobileSideBarActive;
    toggleMobileSideBar({ dispatch, mobileSideBarActive });
  };
};

export const onToggleRightPanel = () => {
  return (dispatch: any, getState: any) => {
    const global = getState().global;
    const { rightPanelExpanded } = global;
    toggleRightPanel({ dispatch, rightPanelExpanded });
  };
};

export const onCancelChanges = (pathname: string, history: any) => {
  return (dispatch: any, getState: any) => {
    navigate({ pathname, history });
  }
};
