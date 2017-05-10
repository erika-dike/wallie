import { CALL_API } from '../../middlewares/api';

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
} from '../actionTypes';


/**
  Action to fetch posts
**/
export function fetchPosts() {
  return {
    [CALL_API]: {
      authenticated: localStorage.getItem('token') !== null,
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
      authenticated: localStorage.getItem('token') !== null,
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

/**
  Action to love a post
**/
export function lovePost(postId) {
  return {
    [CALL_API]: {
      authenticated: true,
      endpoint: `core/posts/${postId}/loves/`,
      httpMethod: 'post',
      types: [
        LOVE_POST_REQUEST,
        LOVE_POST_SUCCESS,
        LOVE_POST_FAILURE,
      ],
      data: {},
    },
  };
}
