import { isTokenExpired } from '../../utils';
import {
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REFRESH_AUTH_STATE,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  TOGGLE_LOGIN_MODAL,
} from '../../actions/actionTypes';


const INITIAL_STATE = {
  errors: [],
  loading: false,
  isAuthenticated: !isTokenExpired(),
  showLoginModal: false,
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
    case REFRESH_TOKEN_REQUEST:
      return { ...state, loading: true };
    case REFRESH_TOKEN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true };
    case REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.payload.showLoginModal,
        errors: action.payload.errors,
      };
    case LOGOUT_USER_REQUEST:
      return { ...state, loading: true };
    case LOGOUT_USER_SUCCESS:
      return { ...state, loading: false, isAuthenticated: false };
    default:
      return state;
  }
}
