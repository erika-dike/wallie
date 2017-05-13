import { CALL_API } from '../../middlewares/api';

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
  UNLOVE_POST_FAILURE,
  UNLOVE_POST_REQUEST,
  UNLOVE_POST_SUCCESS,
} from '../actionTypes';


/**
  Action to fetch posts
**/
export function fetchPosts(queryParams = '') {
  return {
    [CALL_API]: {
      authenticated: localStorage.getItem('token') !== null,
      endpoint: `core/posts/?${queryParams}`,
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
export function fetchTopPosts(queryParams = '') {
  return {
    [CALL_API]: {
      authenticated: localStorage.getItem('token') !== null,
      endpoint: `core/posts?${queryParams}&limit=5`,
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
  Action to create a post
**/
export function createPost(content) {
  return {
    [CALL_API]: {
      authenticated: true,
      endpoint: 'core/posts/',
      httpMethod: 'post',
      types: [
        CREATE_POST_REQUEST,
        CREATE_POST_SUCCESS,
        CREATE_POST_FAILURE,
      ],
      data: { content },
    },
  };
}

/**
  Action to edit a post
**/
export function editPost(id, content) {
  return {
    [CALL_API]: {
      authenticated: true,
      endpoint: `core/posts/${id}/`,
      httpMethod: 'put',
      types: [
        EDIT_POST_REQUEST,
        EDIT_POST_SUCCESS,
        EDIT_POST_FAILURE,
      ],
      data: { content },
    },
  };
}

/**
  Action to delete a post
**/
export function deletePost(id) {
  return {
    [CALL_API]: {
      authenticated: true,
      endpoint: `core/posts/${id}/`,
      httpMethod: 'delete',
      types: [
        DELETE_POST_REQUEST,
        DELETE_POST_SUCCESS,
        DELETE_POST_FAILURE,
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

/**
  Action to unlove a post
**/
export function unlovePost(postId) {
  return {
    [CALL_API]: {
      authenticated: true,
      endpoint: `core/posts/${postId}/loves/`,
      httpMethod: 'delete',
      types: [
        UNLOVE_POST_REQUEST,
        UNLOVE_POST_SUCCESS,
        UNLOVE_POST_FAILURE,
      ],
      data: {},
    },
  };
}
