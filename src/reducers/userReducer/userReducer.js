import { isTokenExpired } from '../../utils';
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../../actions/actionTypes';


const INITIAL_STATE = {
  errors: [],
  profile: isTokenExpired() ? null : JSON.parse(localStorage.getItem('profile')),
  registering: false,
  registered: false,
  pending: false,
  fetched: false,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER_PENDING:
      return { ...state, registering: true, fetched: false };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        errors: [],
        registering: false,
        registered: true,
      };
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registering: false,
        errors: action.payload,
      };
    }
    case FETCH_USER_REQUEST:
      return { ...state, pending: true, fetched: false };
    case FETCH_USER_SUCCESS:
      return { ...state, pending: false, fetched: true, profile: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, pending: false, errors: action.payload };
    case UPDATE_PROFILE_REQUEST:
      return { ...state, pending: true, fetched: false };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, pending: false, fetched: true, profile: action.payload };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, pending: false, errors: action.payload };
    default:
      return state;
  }
}
