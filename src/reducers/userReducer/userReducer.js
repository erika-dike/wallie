import {
  REGISTER_USER_FAILED,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS,
} from '../../actions/types';


const INITIAL_STATE = {
  errors: [],
  user: null,
  registering: false,
  registered: false,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER_PENDING:
      return { ...state, registering: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registering: false,
        registered: true,
        user: action.payload,
      };
    case REGISTER_USER_FAILED:
      const response = action.payload;
      let errors;
      if (response.message === 'Network Error') {
        errors = [
          'Something seems to be wrong with the network. Please try again',
        ];
      } else {
        errors = response.response.data;
      }
      return {
        ...state,
        registering: false,
        errors,
      };
    default:
      return state;
  }
}
