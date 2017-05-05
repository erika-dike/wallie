import api from '../config';

import {
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  REFRESH_AUTH_STATE,
} from '../types';
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
