import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import profile from '../../fixtures/profile.json';

import {
  FETCH_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  TOGGLE_LOGIN_MODAL,
} from '../actionTypes';
import api from '../config';

import {
  loginUser,
  loginUserFailed,
  loginUserPending,
  loginUserSuccess,
  logout,
  logoutUserRequest,
  logoutUserSuccess,
  refreshToken,
  refreshTokenFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  toggleLoginModal,
  updateUserOnLogin,
} from './authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('login actions test suite', () => {
  test('loginUserRequest creates LOGIN_USER_PENDING action', () => {
    const expectedAction = { type: LOGIN_USER_PENDING };
    expect(loginUserPending()).toEqual(expectedAction);
  });

  test('loginUserSuccess creates LOGIN_USER_SUCCESS action', () => {
    const expectedAction = { type: LOGIN_USER_SUCCESS };
    expect(loginUserSuccess()).toEqual(expectedAction);
  });

  test('loginUserFailed creates LOGIN_USER_FAILED action', () => {
    const errors = {
      response: {
        data: ['Invalid credentials'],
      },
    };
    const expectedAction = {
      type: LOGIN_USER_FAILED,
      payload: errors.response.data,
    };
    expect(loginUserFailed(errors)).toEqual(expectedAction);
  });

  test('updateUserOnLogin creates FETCH_USER_SUCCESS', () => {
    const expectedActions = { type: FETCH_USER_SUCCESS, payload: profile };
    expect(updateUserOnLogin(profile)).toEqual(expectedActions);
  });

  test('loginUser creates LOGIN_USER_PENDING and LOGIN_USER_SUCCESS on success',
  async () => {
    const credentials = { username: 'john_doe', password: 'notsecret' };
    const response = {
      status: 201,
      data: {
        token: 'some-random-long-string',
        profile,
      },
    };

    // order matters, action are listed in the order in which they are
    // expected to be called
    const expectedActions = [
      { type: LOGIN_USER_PENDING },
      { type: FETCH_USER_SUCCESS, payload: profile },
      { type: LOGIN_USER_SUCCESS },
    ];

    // mock the axios post method
    api.post = jest.fn(() => Promise.resolve(response));

    const store = mockStore({ auth: {}, user: {} });
    await store.dispatch(loginUser(credentials));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('loginUser creates LOGIN_USER_PENDING and LOGIN_USER_FAILED on failed login',
  async () => {
    const credentials = { username: 'john_doe', password: 'notsecret' };
    const response = {
      status: 401,
      response: {
        data: ['Invalid credentials'],
      },
    };

    // order matters, action are listed in the order in which they are
    // expected to be called
    const expectedActions = [
      { type: LOGIN_USER_PENDING },
      { type: LOGIN_USER_FAILED, payload: response.response.data },
    ];

    // mock the axios post method
    api.post = jest.fn(() => Promise.reject(response));

    const store = mockStore({ auth: {}, user: {} });
    await store.dispatch(loginUser(credentials));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('refreshToken test suite', () => {
  test('refreshTokenRequest creates REFRESH_TOKEN_REQUEST', () => {
    const expectedAction = { type: REFRESH_TOKEN_REQUEST };
    expect(refreshTokenRequest()).toEqual(expectedAction);
  });

  test('refreshTokenFailure creates REFRESH_TOKEN_FAILURE', () => {
    const errors = {
      response: {
        data: ['The token provided has expired'],
      },
    };
    const expectedAction = {
      type: REFRESH_TOKEN_FAILURE,
      payload: errors.response.data,
    };
    expect(refreshTokenFailure(errors)).toEqual(expectedAction);
  });

  test('refreshTokenSuccess creates REFRESH_TOKEN_SUCCESS', () => {
    const expectedAction = { type: REFRESH_TOKEN_SUCCESS };
    expect(refreshTokenSuccess()).toEqual(expectedAction);
  });

  test('refreshToken creates REFRESH_TOKEN_REQUEST and REFRESH_TOKEN_SUCCESS on success',
  async () => {
    const response = {
      status: 200,
      data: {
        token: 'some-random-long-string',
        profile,
      },
    };

    // order matters, action are listed in the order in which they are
    // expected to be called
    const expectedActions = [
      { type: REFRESH_TOKEN_REQUEST },
      { type: REFRESH_TOKEN_SUCCESS },
    ];

    // mock the axios post method
    api.post = jest.fn(() => Promise.resolve(response));

    const store = mockStore({ auth: {} });
    await store.dispatch(refreshToken());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('refreshToken creates REFRESH_TOKEN_REQUEST and REFRESH_TOKEN_FAILURE on request fail',
  async () => {
    const response = {
      status: 401,
      response: {
        data: ['Your token has expired'],
      },
    };

    // order matters, action are listed in the order in which they are
    // expected to be called
    const expectedActions = [
      { type: REFRESH_TOKEN_REQUEST },
      { type: REFRESH_TOKEN_FAILURE, payload: response.response.data },
    ];

    // mock the axios post method
    api.post = jest.fn(() => Promise.reject(response));

    const store = mockStore({ auth: {} });
    await store.dispatch(refreshToken());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('toggle login modal actions test suite', () => {
  it('creates TOGGLE_LOGIN_MODAL', () => {
    const showLoginModal = true;
    const errors = ['You need to login to continue'];
    const expectedAction = {
      type: TOGGLE_LOGIN_MODAL,
      payload: { showLoginModal, errors },
    };
    expect(toggleLoginModal(showLoginModal, errors)).toEqual(expectedAction);
  });
});

describe('logout actions test suite', () => {
  test('logoutUserRequest creates LOGOUT_USER_REQUEST', () => {
    const expectedAction = { type: LOGOUT_USER_REQUEST };
    expect(logoutUserRequest()).toEqual(expectedAction);
  });

  test('logoutUserSuccess creates LOGOUT_USER_SUCCESS', () => {
    const expectedAction = { type: LOGOUT_USER_SUCCESS };
    expect(logoutUserSuccess()).toEqual(expectedAction);
  });

  test('logout creates LOGOUT_USER_REQUEST and LOGOUT_USER_SUCCESS',
  async () => {
    // order matters, action are listed in the order in which they are
    // expected to be called
    const expectedActions = [
      { type: LOGOUT_USER_REQUEST },
      { type: LOGOUT_USER_SUCCESS },
    ];

    const store = mockStore({ auth: {} });
    await store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
