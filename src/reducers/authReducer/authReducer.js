import {
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  REFRESH_AUTH_STATE,
} from '../../actions/types';


const INITIAL_STATE = {
  errors: [],
  loading: false,
  isAuthenticated: localStorage.getItem('token') !== null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER_PENDING:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    }
    case REFRESH_AUTH_STATE:
      return {
        ...state,
        errors: [],
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
