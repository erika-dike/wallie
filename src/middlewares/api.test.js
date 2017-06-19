import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

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
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  TOGGLE_LOGIN_MODAL,
} from '../actions/actionTypes';
import api from '../actions/config';
import posts from '../fixtures/posts.json';
import profile from '../fixtures/profile.json';

import callApiMiddleware, { CALL_API } from './api';


jest.mock('../actions', () => ({
  ...require.requireActual('../actions'),
  logout: jest.fn(() => 'logout'),
  refreshToken: jest.fn(() => 'refreshToken'),
}));

jest.mock('../utils', () => ({
  ...require.requireActual('../utils'),
  isTokenExpired: () => false,
  tokenBelowRefreshThreshold: () => true,
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Middleware::Api test suite', () => {
  let store;
  let next;
  let action;
  let response;
  const url = 'http://api-url.com/resource/';
  const config = {
    headers: { Authorization: `JWT ${localStorage.getItem('token')}` },
  };

  beforeEach(() => {
    store = mockStore({ auth: {}, post: {}, user: {} });
    next = jest.fn(() => 'next');
  });

  describe('when action is without CALL_API', () => {
    it('passes the action to next middleware', () => {
      action = { type: 'not-CALL-API' };
      callApiMiddleware(store)(next)(action);
      expect(next).toHaveBeenCalledWith(action);
    });
  });

  describe('successful unauthenticated get request', () => {
    beforeEach(async () => {
      response = {
        status: 200,
        data: posts,
      };
      api.get = jest.fn(() => Promise.resolve(response));
      action = {
        [CALL_API]: {
          authenticated: false,
          httpMethod: 'get',
          endpoint: url,
          types: [FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE],
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    it('makes api get requests successfully', () => {
      const localConfig = {};
      expect(api.get).toHaveBeenCalledWith(url, localConfig);
    });

    it('creates FETCH_POSTS_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: FETCH_POSTS_REQUEST });
    });

    it('creates FETCH_POSTS_SUCCESS', () => {
      expect(next).toHaveBeenCalledWith({
        type: FETCH_POSTS_SUCCESS,
        payload: posts,
      });
    });

    it('creates refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('unsuccessful unauthenticated get request', () => {
    beforeEach(async () => {
      response = {
        message: 'Network Error',
        data: null,
      };
      api.get = jest.fn(() => Promise.reject(response));
      action = {
        [CALL_API]: {
          authenticated: false,
          httpMethod: 'get',
          endpoint: url,
          types: [FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE],
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    it('calls api.get', () => {
      const localConfig = {};
      expect(api.get).toHaveBeenCalledWith(url, localConfig);
    });

    it('creates FETCH_POSTS_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: FETCH_POSTS_REQUEST });
    });

    it('creates FETCH_POSTS_FAILURE', () => {
      expect(next).toHaveBeenCalledWith({
        type: FETCH_POSTS_FAILURE,
        payload: ['Something seems to be wrong with the network. Please try again'],
      });
    });

    it('does not create refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('successful authenticated get request', () => {
    beforeEach(async () => {
      response = {
        status: 200,
        data: profile,
      };
      api.get = jest.fn(() => Promise.resolve(response));
      action = {
        [CALL_API]: {
          authenticated: true,
          httpMethod: 'get',
          endpoint: url,
          types: [FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    it('makes api get requests successfully', () => {
      expect(api.get).toHaveBeenCalledWith(url, config);
    });

    it('creates FETCH_USER_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: FETCH_USER_REQUEST });
    });

    it('creates FETCH_USER_SUCCESS', () => {
      expect(next).toHaveBeenCalledWith({
        type: FETCH_USER_SUCCESS,
        payload: profile,
      });
    });

    it('creates refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('authenticated get request when no token', () => {
    let originalLocalStorage;

    beforeEach(async () => {
      originalLocalStorage = global.localStorage;
      global.localStorage = {
        getItem: () => null,
      };

      response = {
        status: 401,
        data: profile,
      };
      api.get = jest.fn(() => Promise.resolve(response));
      action = {
        [CALL_API]: {
          authenticated: true,
          httpMethod: 'get',
          endpoint: url,
          types: [FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    afterEach(() => {
      global.localStorage = originalLocalStorage;
    });

    it('makes api get requests successfully', () => {
      expect(api.get).not.toHaveBeenCalledWith(url, config);
    });

    it('creates FETCH_USER_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: FETCH_USER_REQUEST });
    });

    it('does not create FETCH_USER_SUCCESS', () => {
      expect(next).not.toHaveBeenCalledWith({
        type: FETCH_USER_SUCCESS,
        payload: profile,
      });
    });

    it('calls actions with logout', () => {
      expect(next).toHaveBeenCalledWith('logout');
    });

    it('calls actions with toggleLoginModal ', () => {
      const expectedActions = {
        type: TOGGLE_LOGIN_MODAL,
        payload: {
          errors: ['You have to log in to continue'],
          showLoginModal: true,
        },
      };
      expect(next).toHaveBeenCalledWith(expectedActions);
    });

    it('creates refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('authenticated post request success', () => {
    beforeEach(async () => {
      response = {
        status: 201,
        data: posts[2],
      };
      api.post = jest.fn(() => Promise.resolve(response));
      action = {
        [CALL_API]: {
          authenticated: true,
          httpMethod: 'post',
          endpoint: url,
          types: [CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE],
          data: posts[2],
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    it('makes api post requests successfully', () => {
      expect(api.post).toHaveBeenCalledWith(url, posts[2], config);
    });

    it('creates CREATE_POST_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: CREATE_POST_REQUEST });
    });

    it('creates CREATE_POST_SUCCESS', () => {
      expect(next).toHaveBeenCalledWith({
        type: CREATE_POST_SUCCESS,
        payload: posts[2],
      });
    });

    it('creates refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('authenticated post request fail due to unauthorized', () => {
    beforeEach(async () => {
      response = {
        response: {
          status: 401,
          data: 'Invalid token',
        },
      };
      api.post = jest.fn(() => Promise.reject(response));
      action = {
        [CALL_API]: {
          authenticated: true,
          httpMethod: 'post',
          endpoint: url,
          types: [CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE],
          data: posts[2],
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    it('makes api post requests successfully', () => {
      expect(api.post).toHaveBeenCalledWith(url, posts[2], config);
    });

    it('creates CREATE_POST_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: CREATE_POST_REQUEST });
    });

    it('does not create CREATE_POST_SUCCESS', () => {
      expect(next).not.toHaveBeenCalledWith({
        type: CREATE_POST_SUCCESS,
        payload: posts[2],
      });
    });

    it('calls actions with logout', () => {
      expect(next).toHaveBeenCalledWith('logout');
    });

    it('calls actions with toggleLoginModal ', () => {
      const expectedActions = {
        type: TOGGLE_LOGIN_MODAL,
        payload: {
          errors: ['You have to log in to continue'],
          showLoginModal: true,
        },
      };
      expect(next).toHaveBeenCalledWith(expectedActions);
    });

    it('creates refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('authenticated put request success', () => {
    beforeEach(async () => {
      response = {
        status: 200,
        data: posts[2],
      };
      api.put = jest.fn(() => Promise.resolve(response));
      action = {
        [CALL_API]: {
          authenticated: true,
          httpMethod: 'put',
          endpoint: url,
          types: [EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE],
          data: posts[2],
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    it('makes api post requests successfully', () => {
      expect(api.put).toHaveBeenCalledWith(url, posts[2], config);
    });

    it('creates EDIT_POST_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: EDIT_POST_REQUEST });
    });

    it('creates EDIT_POST_SUCCESS', () => {
      expect(next).toHaveBeenCalledWith({
        type: EDIT_POST_SUCCESS,
        payload: posts[2],
      });
    });

    it('creates refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('authenticated put request fail due to missing field', () => {
    let post;

    beforeEach(async () => {
      post = posts[2];
      delete post.about;
      response = {
        status: 400,
        response: {
          data: { about: ['This field is required'] },
        },
      };
      api.put = jest.fn(() => Promise.reject(response));
      action = {
        [CALL_API]: {
          authenticated: true,
          httpMethod: 'put',
          endpoint: url,
          types: [EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE],
          data: post,
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    it('makes api post requests successfully', () => {
      expect(api.put).toHaveBeenCalledWith(url, posts[2], config);
    });

    it('creates EDIT_POST_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: EDIT_POST_REQUEST });
    });

    it('creates EDIT_POST_SUCCESS', () => {
      expect(next).not.toHaveBeenCalledWith({
        type: EDIT_POST_SUCCESS,
        payload: post,
      });
    });

    it('creates EDIT_POST_FAILURE', () => {
      expect(next).toHaveBeenCalledWith({
        type: EDIT_POST_FAILURE,
        payload: ['about: This field is required'],
      });
    });

    it('creates refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('authenticated delete request success', () => {
    beforeEach(async () => {
      response = {
        status: 204,
      };
      api.delete = jest.fn(() => Promise.resolve(response));
      action = {
        [CALL_API]: {
          authenticated: true,
          httpMethod: 'delete',
          endpoint: url,
          types: [DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE],
        },
      };
      await callApiMiddleware(store)(next)(action);
    });

    it('makes api post requests successfully', () => {
      expect(api.put).toHaveBeenCalledWith(url, posts[2], config);
    });

    it('creates DELETE_POST_REQUEST', () => {
      expect(next).toHaveBeenCalledWith({ type: DELETE_POST_REQUEST });
    });

    it('creates DELETE_POST_SUCCESS', () => {
      expect(next).toHaveBeenCalledWith({
        type: DELETE_POST_SUCCESS,
        payload: url,
      });
    });

    it('creates refreshtoken', () => {
      expect(next).toHaveBeenCalledWith('refreshToken');
    });
  });
});
