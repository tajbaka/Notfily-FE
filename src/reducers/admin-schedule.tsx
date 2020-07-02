import { GET_SCHEDULES_DATA_ERROR, GET_SCHEDULES_DATA_SUCCESS } from "../actions/schedule/types";

import { LOGIN_SUCCESS, LOGOUT } from "../actions/auth/types";
  
  const INITIAL_STATE = {
    error: '',
    schedules: [
      {
        title: 'Default',
      }
    ]
  };
  
  export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case GET_SCHEDULES_DATA_SUCCESS:
        return { ...state, schedules: action.payload, error: '' };
      case GET_SCHEDULES_DATA_ERROR:
        return { ...state, error: action.payload };
      case LOGIN_SUCCESS:
        return { ...state, userEmail: '', userName: '', userPhoneNumber: ''}
      case LOGOUT:
        return { ...state };
      default:
        return state;
    }
  };
  