import {
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  TOGGLE_LOGIN_MODAL,
} from '../../actions/actionTypes';

import authReducer from './authReducer';

jest.mock('../../utils', () => ({
  isTokenExpired: () => true,
}));


describe('Auth reducer test suite', () => {
  let errors;
  let state;

  beforeEach(() => {
    errors = ['There are many errors'];
    state = {
      errors: [],
      loading: false,
      isAuthenticated: false,
      showLoginModal: false,
    };
  });

  it('should return the initial state', () => {
    const expectedState = { ...state };
    expect(authReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle LOGIN_USER_PENDING', () => {
    const expectedState = { ...state, loading: true };
    const action = { type: LOGIN_USER_PENDING };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_USER_SUCCESS', () => {
    const expectedState = { ...state, loading: false, isAuthenticated: true };
    const action = { type: LOGIN_USER_SUCCESS };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_USER_FAILED', () => {
    const expectedState = { ...state, loading: false, errors };
    const action = { type: LOGIN_USER_FAILED, payload: errors };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle REFRESH_TOKEN_REQUEST', () => {
    const expectedState = { ...state, loading: true };
    const action = { type: REFRESH_TOKEN_REQUEST };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle REFRESH_TOKEN_SUCCESS', () => {
    const expectedState = { ...state, loading: false, isAuthenticated: true };
    const action = { type: REFRESH_TOKEN_SUCCESS };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle REFRESH_TOKEN_FAILURE', () => {
    const expectedState = { ...state, loading: false, errors };
    const action = { type: REFRESH_TOKEN_FAILURE, payload: errors };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_LOGIN_MODAL', () => {
    const payload = { showLoginModal: true, errors };
    const expectedState = { ...state, showLoginModal: true, errors };
    const action = { type: TOGGLE_LOGIN_MODAL, payload };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT_USER_REQUEST', () => {
    const expectedState = { ...state, loading: true };
    const action = { type: LOGOUT_USER_REQUEST };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT_USER_SUCCESS', () => {
    const expectedState = { ...state, loading: false, isAuthenticated: false };
    const action = { type: LOGOUT_USER_SUCCESS };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
});
