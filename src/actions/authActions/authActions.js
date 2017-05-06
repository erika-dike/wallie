import api from '../config';

import {
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REFRESH_AUTH_STATE,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  TOGGLE_LOGIN_MODAL,
} from '../actionTypes';
import handleErrors from '../errorHandler';

export function loginUserPending() {
  return { type: LOGIN_USER_PENDING };
}

export function loginUserFailed(response) {
  const errors = handleErrors(response);
  return { type: LOGIN_USER_FAILED, payload: errors };
}

export function loginUserSuccess() {
  return { type: LOGIN_USER_SUCCESS };
}

export function loginUser(credential) {
  return (dispatch) => {
    dispatch(loginUserPending());
    api.post('accounts/auth/login/', credential)
      .then(
        (response) => {
          const { profile, token } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('profile', JSON.stringify(profile));
          dispatch(loginUserSuccess());
        },
        error => dispatch(loginUserFailed(error)),
      );
  };
}

export function refreshAuthState() {
  return { type: REFRESH_AUTH_STATE };
}

function refreshTokenRequest() {
  return { type: REFRESH_TOKEN_REQUEST };
}

function refreshTokenFailure(response) {
  const errors = handleErrors(response);
  return { type: REFRESH_TOKEN_FAILURE, payload: errors };
}

function refreshTokenSuccess() {
  return { type: REFRESH_TOKEN_SUCCESS };
}

export function refreshToken() {
  return (dispatch) => {
    dispatch(refreshTokenRequest());
    api.post('accounts/auth/api-token-refresh/', { token: localStorage.token })
      .then(
        (response) => {
          const { profile, token } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('profile', JSON.stringify(profile));
          dispatch(refreshTokenSuccess());
        },
        error => dispatch(refreshTokenFailure(error)),
      );
  };
}

export function toggleLoginModal(showLoginModal, errors) {
  return {
    type: TOGGLE_LOGIN_MODAL,
    payload: { showLoginModal, errors },
  };
}

function logoutUserRequest() {
  return { type: LOGOUT_USER_REQUEST };
}

function logoutUserSuccess() {
  return { type: LOGOUT_USER_SUCCESS };
}

export function logoutUser() {
  return (dispatch) => {
    debugger;
    dispatch(logoutUserRequest());
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    dispatch(logoutUserSuccess());
  };
}
