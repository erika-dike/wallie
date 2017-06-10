import {
  FETCH_USER_SUCCESS,
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
import api from '../config';
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

export function updateUserOnLogin(profile) {
  return { type: FETCH_USER_SUCCESS, payload: profile };
}

export function loginUser(credential) {
  return (dispatch) => {
    dispatch(loginUserPending());
    api.post('accounts/auth/login/', credential)
      .then(
        (response) => {
          const { profile, token } = response.data;
          dispatch(updateUserOnLogin(profile));
          dispatch(loginUserSuccess());
          localStorage.setItem('token', token);
          localStorage.setItem('profile', JSON.stringify(profile));
        },
        error => dispatch(loginUserFailed(error)),
      );
  };
}

export function refreshTokenRequest() {
  return { type: REFRESH_TOKEN_REQUEST };
}

export function refreshTokenFailure(response) {
  const errors = handleErrors(response);
  return { type: REFRESH_TOKEN_FAILURE, payload: errors };
}

export function refreshTokenSuccess() {
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

export function logoutUserRequest() {
  return { type: LOGOUT_USER_REQUEST };
}

export function logoutUserSuccess() {
  return { type: LOGOUT_USER_SUCCESS };
}

export function logout() {
  return async (dispatch) => {
    dispatch(logoutUserRequest());
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    dispatch(logoutUserSuccess());
  };
}
