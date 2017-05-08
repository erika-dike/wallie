import { CALL_API } from '../../middlewares/api';

import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from '../actionTypes';


/**
  Action to fetch the authenticated users profile
**/
export function fetchPosts(queryParams = '') {
  return {
    [CALL_API]: {
      authenticated: false,
      endpoint: `core/posts?${queryParams}`,
      httpMethod: 'get',
      types: [
        FETCH_POSTS_REQUEST,
        FETCH_POSTS_SUCCESS,
        FETCH_POSTS_FAILURE,
      ],
    },
  };
}

