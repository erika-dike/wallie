import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_TOP_POSTS_FAILURE,
  FETCH_TOP_POSTS_REQUEST,
  FETCH_TOP_POSTS_SUCCESS,
  LOVE_POST_FAILURE,
  LOVE_POST_REQUEST,
  LOVE_POST_SUCCESS,
} from '../../actions/actionTypes';


const INITIAL_STATE = {
  errors: [],
  posts: [],
  topPosts: [],
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
    case FETCH_TOP_POSTS_REQUEST:
      return { ...state, pending: true };
    case FETCH_TOP_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        fetched: true,
        topPosts: action.payload.results,
      };
    case FETCH_TOP_POSTS_FAILURE:
      return { ...state, pending: false, error: action.payload };
    case LOVE_POST_REQUEST:
      return { ...state, pending: true };
    case LOVE_POST_SUCCESS: {
      const { post_id, in_love, num_loves } = action.payload;
      const newPosts = [...state.posts];
      const postToUpdate = newPosts.findIndex(aPost => aPost.id === post_id);
      newPosts[postToUpdate].num_loves = num_loves;
      newPosts[postToUpdate].in_love = in_love;

      return {
        ...state,
        pending: false,
        fetched: true,
        posts: newPosts,
      };
    }
    case LOVE_POST_FAILURE:
      return { ...state, pending: false, error: action.payload };
    default:
      return state;
  }
}
