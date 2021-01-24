import { LOGIN_SUCCESS, LOGOUT } from "../actions/auth/types";
import { GET_USER_DATA_ERROR, GET_USER_DATA_SUCCESS } from "../actions/schedule/types";

  const INITIAL_STATE = {
    adminUid: '',
    userEmail: '',
    userName: undefined,
    userPhoneNumber: '',
    language: 'english',
    error: ''
  };
  
  export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case GET_USER_DATA_ERROR:
        return { ...state, error: action.payload }
      case GET_USER_DATA_SUCCESS:
        return { ...state, error: '', ...action.payload }
      case LOGIN_SUCCESS:
        return { ...state, userEmail: '', userName: '', userPhoneNumber: ''}
      case LOGOUT:
        return { ...state, ...INITIAL_STATE };
      default:
        return state;
    }
  };
  