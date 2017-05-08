import axios from 'axios';

import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  REGISTER_USER_PENDING,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../actionTypes';

import { CALL_API } from '../../middlewares/api';

export function registerUserPending() {
  return { type: REGISTER_USER_PENDING };
}

export function registerUserFailed(response) {
  return { type: REGISTER_USER_FAILED, payload: response };
}

export function registerUserSuccess(data) {
  return { type: REGISTER_USER_SUCCESS, payload: data };
}

export function registerUser(userData) {
  return (dispatch) => {
    dispatch(registerUserPending());
    axios.post('http://localhost:8000/api/v1/accounts/auth/register/', userData)
      .then(
        response => dispatch(registerUserSuccess(response.data)),
        error => dispatch(registerUserFailed(error)),
      );
  };
}

/**
  Action to fetch the authenticated users profile
**/
export function fetchUser() {
  return {
    [CALL_API]: {
      authenticated: true,
      endpoint: 'accounts/profile/',
      httpMethod: 'get',
      types: [FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
    },
  };
}

/**
  Action to update profile
**/
export function updateProfile(profile) {
  return {
    [CALL_API]: {
      authenticated: true,
      endpoint: 'accounts/profile/',
      httpMethod: 'put',
      types: [UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE],
      data: profile,
    },
  };
}
