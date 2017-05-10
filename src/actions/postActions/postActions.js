import { CALL_API } from '../../middlewares/api';

import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_TOP_POSTS_FAILURE,
  FETCH_TOP_POSTS_REQUEST,
  FETCH_TOP_POSTS_SUCCESS,
} from '../actionTypes';


/**
  Action to fetch posts
**/
export function fetchPosts() {
  return {
    [CALL_API]: {
      authenticated: false,
      endpoint: 'core/posts/',
      httpMethod: 'get',
      types: [
        FETCH_POSTS_REQUEST,
        FETCH_POSTS_SUCCESS,
        FETCH_POSTS_FAILURE,
      ],
    },
  };
}

/**
  Action to fetch top posts
**/
export function fetchTopPosts() {
  const queryParams = 'q=top&limit=5';
  return {
    [CALL_API]: {
      authenticated: false,
      endpoint: `core/posts?${queryParams}`,
      httpMethod: 'get',
      types: [
        FETCH_TOP_POSTS_REQUEST,
        FETCH_TOP_POSTS_SUCCESS,
        FETCH_TOP_POSTS_FAILURE,
      ],
    },
  };
}

