import {
    GET_SETTINGS_DATA_ERROR,
    GET_SETTINGS_DATA_SUCCESS,
  } from "../actions/schedule/types";
  
  const INITIAL_STATE = {
    error: '',
    startTime: '8:00 am',
    endTime: '9:00 pm',
    maxScheduledTime: '2',
    maxChangeTime: '3',
    maxEvents: '1',
    timeSplit: '15',
    language: 'english'
  };
  
  export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case GET_SETTINGS_DATA_SUCCESS:
        return { ...state,  ...action.payload, error: '' };
      case GET_SETTINGS_DATA_ERROR:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  