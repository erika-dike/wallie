import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  EDIT_POST_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_TOP_POSTS_FAILURE,
  FETCH_TOP_POSTS_REQUEST,
  FETCH_TOP_POSTS_SUCCESS,
  LOVE_POST_FAILURE,
  LOVE_POST_REQUEST,
  LOVE_POST_SUCCESS,
  RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET,
  RECEIVED_POST_DELETE_VIA_WEBSOCKET,
  RECEIVED_POST_UPDATE_VIA_WEBSOCKET,
  UNLOVE_POST_FAILURE,
  UNLOVE_POST_REQUEST,
  UNLOVE_POST_SUCCESS,
} from '../../actions/actionTypes';


const INITIAL_STATE = {
  errors: [],
  posts: [],
  topPosts: [],
  next: null,
  previous: null,
  pending: false,
  fetched: true,
};

export default function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, pending: true, fetched: false };
    case FETCH_POSTS_SUCCESS: {
      let newPosts;
      if (action.payload.previous) {
        newPosts = [...state.posts, ...action.payload.results];
      } else {
        newPosts = [...action.payload.results];
      }

      return {
        ...state,
        fetched: true,
        pending: false,
        posts: newPosts,
        next: action.payload.next,
      };
    }
    case FETCH_POSTS_FAILURE:
      return { ...state, pending: false, errors: action.payload };
    case RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET: {
      const { post_id, num_loves } = action.payload;
      const newPosts = [...state.posts];
      const postToUpdate = newPosts.findIndex(aPost => aPost.id === post_id);

      // this prevents errors when a private user is logged in and doesn't have
      // the posts of others in his store
      if (postToUpdate > -1) {
        newPosts[postToUpdate].num_loves = num_loves;
      }

      return {
        ...state,
        pending: false,
        fetched: true,
        posts: newPosts,
      };
    }
    case RECEIVED_POST_UPDATE_VIA_WEBSOCKET: {
      const newPost = action.payload;
      const oldPosts = state.posts.filter(eachPost => eachPost.id !== newPost.id);
      const newPosts = [newPost, ...oldPosts];
      return {
        ...state,
        posts: newPosts,
      };
    }
    case RECEIVED_POST_DELETE_VIA_WEBSOCKET: {
      const postId = action.payload;
      const newPosts = state.posts.filter(eachPost => eachPost.id !== postId);
      return {
        ...state,
        posts: newPosts,
      };
    }
    case FETCH_TOP_POSTS_REQUEST:
      return { ...state, pending: true, fetched: false };
    case FETCH_TOP_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        fetched: true,
        topPosts: action.payload.results,
      };
    case FETCH_TOP_POSTS_FAILURE:
      return { ...state, pending: false, errors: action.payload };
    case CREATE_POST_REQUEST:
      return { ...state, pending: true, fetched: false };
    case CREATE_POST_SUCCESS: {
      const newPost = {
        ...action.payload,
        num_loves: 0,
        in_love: false,
      };
      const newPosts = [newPost, ...state.posts];

      return {
        ...state,
        pending: false,
        fetched: true,
        posts: newPosts,
      };
    }
    case CREATE_POST_FAILURE:
      return { ...state, pending: false, errors: action.payload };
    case EDIT_POST_REQUEST:
      return { ...state, pending: true, fetched: false };
    case EDIT_POST_SUCCESS: {
      const editedPost = action.payload;
      const oldPosts = state.posts.filter(apost => apost.id !== editedPost.id);
      const newPosts = [editedPost, ...oldPosts];

      return {
        ...state,
        pending: false,
        fetched: true,
        posts: newPosts,
      };
    }
    case EDIT_POST_FAILURE:
      return { ...state, pending: false, errors: action.payload };
    case DELETE_POST_REQUEST:
      return { ...state, pending: true, fetched: false };
    case DELETE_POST_SUCCESS: {
      const postId = Number(action.payload.split('/')[2]);
      const newPosts = state.posts.filter(apost => apost.id !== postId);

      return {
        ...state,
        pending: false,
        fetched: true,
        posts: newPosts,
      };
    }
    case DELETE_POST_FAILURE:
      return { ...state, pending: false, errors: action.payload };
    case LOVE_POST_REQUEST:
      return { ...state, pending: true, fetched: false };
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
      return { ...state, pending: false, errors: action.payload };
    case UNLOVE_POST_REQUEST:
      return { ...state, pending: true, fetched: false };
    case UNLOVE_POST_SUCCESS: {
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
    case UNLOVE_POST_FAILURE:
      return { ...state, pending: false, errors: action.payload };
    default:
      return state;
  }
}
