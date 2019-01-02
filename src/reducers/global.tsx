import {
  TOGGLE_SIDEBAR,
  UPDATE_DEVICE_TYPE,
  UPDATE_HISTORY,
  UPDATE_IS_MOBILE_SIZE,
  UPDATE_LOCATION,
  UPDATE_PROFILE_DATA,
  UPDATE_TOOL_BAR,
  UPDATE_WINDOW_HEIGHT,
  UPDATE_WINDOW_WIDTH,
} from "../actions";

const INITIAL_STATE = {
  profileData: null,
  isMobileSize: false,
  windowHeight: null,
  deviceType: null,
  topBarProps: null,
  mobileSideBarActive: false,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        profileData: action.payload
      };
    case UPDATE_TOOL_BAR:
      return {
        ...state,
        topBarProps: action.payload
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        mobileSideBarActive: action.payload
      };
    case UPDATE_WINDOW_WIDTH:
      return {
        ...state,
        windowWidth: action.payload
      };
    case UPDATE_WINDOW_HEIGHT:
      return {
        ...state,
        windowHeight: action.payload
      };
    case UPDATE_DEVICE_TYPE:
      return {
        ...state,
        deviceType: action.payload
      };
    case UPDATE_IS_MOBILE_SIZE:
      return {
        ...state,
        isMobileSize: action.payload
      };
    case UPDATE_HISTORY:
      return {
        ...state,
        history: action.payload
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
};
