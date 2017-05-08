import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from '../../actions/actionTypes';


const INITIAL_STATE = {
  errors: [],
  posts: [],
  pending: false,
  fetched: true,
};

export default function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, pending: true };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        fetched: true,
        posts: action.payload.results,
      };
    case FETCH_POSTS_FAILURE:
      return { ...state, pending: false, error: action.payload };
    default:
      return state;
  }
}
