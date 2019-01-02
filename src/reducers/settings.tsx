import {
    UPDATE_SETTINGS
  } from "../actions/settings/types";
  
  const INITIAL_STATE = {
    startTime: '8:00 am',
    endTime: '9:00 pm',
    maxScheduledTime: '2',
    maxChangeTime: '3',
    maxEvents: '1',
    timeSplit: '15'
  };
  
  export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case UPDATE_SETTINGS:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  