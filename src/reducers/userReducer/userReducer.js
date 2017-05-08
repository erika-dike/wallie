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
  profile: JSON.parse(localStorage.getItem('profile')),
  registering: false,
  registered: false,
  pending: false,
  fetched: true,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER_PENDING:
      return { ...state, registering: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        errors: [],
        registering: false,
        registered: true,
        profile: action.payload,
      };
    case REGISTER_USER_FAILED: {
      const response = action.payload;
      let errors;
      if (response.message === 'Network Error') {
        errors = [
          'Something seems to be wrong with the network. Please try again',
        ];
      } else if (Array.isArray(response.response.data)) {
        errors = response.response.data;
      } else if (response.response.data instanceof Object) {
        errors = Object.keys(response.response.data).map((field) => {
          const displayFieldName = field.replace(/_/g, ' ');
          return ` ${displayFieldName}: ${response.response.data[field][0]}`;
        });
      }
      return {
        ...state,
        registering: false,
        errors,
      };
    }
    case FETCH_USER_REQUEST:
      return { ...state, pending: true };
    case FETCH_USER_SUCCESS:
      return { ...state, pending: false, fetched: true, profile: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, pending: false, error: action.payload };
    case UPDATE_PROFILE_REQUEST:
      return { ...state, pending: true };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, pending: false, fetched: true, profile: action.payload };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, pending: false, error: action.payload };
    default:
      return state;
  }
}