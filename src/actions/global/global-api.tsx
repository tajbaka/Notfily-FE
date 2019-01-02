import {  TOGGLE_RIGHTPANEL, TOGGLE_SIDEBAR, UPDATE_DEVICE_TYPE, UPDATE_IS_MOBILE_SIZE, UPDATE_PROFILE_DATA, UPDATE_TOOL_BAR, UPDATE_WINDOW_HEIGHT, UPDATE_WINDOW_WIDTH } from "../global/types";

import dataJson from "./data.json";

import { getMobileOperatingSystem } from '../';

export const updateWindowWidth = (ref: any) => {
  const { dispatch, width } = ref;
  dispatch({ type: UPDATE_WINDOW_WIDTH, payload: width });
  updateIsMobileSize(ref);
};

export const updateIsMobileSize = (ref: any) => {
  const { dispatch, width } = ref;
  const isMobileSize = width <= 480;
  dispatch({ type: UPDATE_IS_MOBILE_SIZE, payload: isMobileSize });
};

export const updateDeviceType = (ref: any) => {
  const { dispatch } = ref;
  const deviceType = getMobileOperatingSystem();
  dispatch({ type: UPDATE_DEVICE_TYPE, payload: deviceType });
};

export const updateWindowHeight = (ref: any) => {
  const { dispatch, height } = ref;
  dispatch({ type: UPDATE_WINDOW_HEIGHT, payload: height });
};

export const updateToolBar = (ref: any) => {
  const { topBarProps, dispatch } = ref;
  dispatch({
    type: UPDATE_TOOL_BAR,
    payload: topBarProps
  });
};

export const toggleMobileSideBar = (ref: any) => {
  const { dispatch, mobileSideBarActive } = ref;
  dispatch({
    type: TOGGLE_SIDEBAR,
    payload: !mobileSideBarActive
  });
};

export const getProfileData = (ref: any) => {
  const { dispatch } = ref;
  const profileData = dataJson;
  dispatch({ type: UPDATE_PROFILE_DATA, payload: profileData });
};

export const toggleProfileStatus = (ref: any) => {
  const { dispatch, profileData } = ref;
  profileData.status = !profileData.status;
  updateProfile({ profileData, dispatch });
};

const updateProfile = (ref: any) => {
  const { dispatch, profileData } = ref;
  const newProfileData = JSON.parse(JSON.stringify(profileData));
  dispatch({
    type: UPDATE_PROFILE_DATA,
    payload: newProfileData
  });
}

export const toggleRightPanel = (ref: any) => {
  const { dispatch, rightPanelExpanded } = ref;
  dispatch({
    type: TOGGLE_RIGHTPANEL,
    payload: !rightPanelExpanded
  });
};

export const navigate = (ref: any) => {
  const { pathname, history } = ref;
  history.push(pathname);
};