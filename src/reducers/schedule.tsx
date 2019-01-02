import { UPDATE_SCHEDULE } from "../actions/schedule/types";

import { LOGOUT_USER } from "../actions/auth/types";
  
  const INITIAL_STATE = {
    userEmail: '',
    userName: '',
    userPhoneNumber: '',
    schedules: [
      {
        id: 910,
        events: [],
        title: 'Marly'
      },
      {
        id: 910,
        events: [],
        title: 'Test'
      }
    ]
  };
  
  export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case UPDATE_SCHEDULE:
        return { ...state, ...action.payload };
      case LOGOUT_USER:
      console.log({...state})
      console.log({...INITIAL_STATE})
        return { ...state };
      default:
        return state;
    }
  };
  