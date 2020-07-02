import { START_LOADING, DONE_LOADING } from "../actions/global/types";
  
  const INITIAL_STATE = {
    loading: false,
  };
  
  export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, loading: true };
        case DONE_LOADING:
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  