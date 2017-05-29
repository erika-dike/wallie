import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import api from '../config';

import {
  registerUser,
  registerUserPending,
  registerUserFailed,
  registerUserSuccess,
} from './userActions';
import {
  REGISTER_USER_FAILED,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS,
} from '../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('register actions', () => {
  it('should create an action to indicate registration request', () => {
    const expectedAction = {
      type: REGISTER_USER_PENDING,
    };
    expect(registerUserPending()).toEqual(expectedAction);
  });

  it('should create an action for registration success', () => {
    const data = {
      first_name: 'John',
      last_name: 'Doe',
      user_name: 'john_doe',
    };
    const expectedAction = {
      type: REGISTER_USER_SUCCESS,
      payload: data,
    };
    expect(registerUserSuccess(data)).toEqual(expectedAction);
  });

  it('should create an action for registration rejected', () => {
    const errors = {
      response: {
        data: ['username already exists', 'password fields do not match'],
      },
    };
    const expectedAction = {
      type: REGISTER_USER_FAILED,
      payload: errors.response.data,
    };
    expect(registerUserFailed(errors)).toEqual(expectedAction);
  });

  describe('Register User Test Suite', () => {
    let userData;

    beforeEach(() => {
      userData = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'john_doe',
        email: 'john_doe@wallie.com',
        password1: 'notsecret',
        password2: 'notsecret',
        about: 'Engineer',
        profile_pic: '',
      };
    });

    test(
    `creates REGISTER_USER_PENDING and REGISTER_USER_SUCCESS on
    successful user creation`,
    async () => {
      const response = {
        status: 201,
        data: { ...userData, message: 'Successfully registered' },
      };
      const expectedActions = [
        { type: REGISTER_USER_PENDING },
        { type: REGISTER_USER_SUCCESS, payload: response.data },
      ];
      // mock the axios.post method. so it will just resolve the promise
      api.post = jest.fn(() => Promise.resolve(response));


      const store = mockStore({ user: {} });
      await store.dispatch(registerUser(userData));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test(
    `creates REGISTER_USER_PENDING and REGISTER_USER_SUCCESS on successful
    user creation alternative way`,
    async () => {
      const response = {
        status: 201,
        data: { ...userData, message: 'Successfully registered' },
      };
      const expectedActions = [
        { type: REGISTER_USER_PENDING },
        { type: REGISTER_USER_SUCCESS, payload: response.data },
      ];
      // mock the api.post method. so it will just resolve the promise
      api.post = jest.fn(() => Promise.resolve(response));

      // mock dispatch
      const dispatch = jest.fn(() => response.data);

      await registerUser(userData)(dispatch);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
      expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
    });

    test(
    `creates REGISTER_USER_PENDING and REGISTER_USER_FAILED on
    unsuccessful user creation`,
    async () => {
      const errors = {
        status: 400,
        response: {
          data: ['username is already taken'],
        },
      };
      const expectedActions = [
        { type: REGISTER_USER_PENDING },
        { type: REGISTER_USER_FAILED, payload: errors.response.data },
      ];

      // mock the api.post method. so it will just resolve the promise
      api.post = jest.fn(() => Promise.reject(errors));

      const store = mockStore({ user: {} });
      await store.dispatch(registerUser(userData));
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('network errors', async () => {
      const errors = {
        status: 400,
        message: 'Network Error',
        response: undefined,
      };
      const errorMessage = ['Something seems to be wrong with the network. Please try again'];

      const expectedActions = [
        { type: REGISTER_USER_PENDING },
        { type: REGISTER_USER_FAILED, payload: errorMessage },
      ];

      // mock the api.post method. so it will just resolve the promise
      api.post = jest.fn(() => Promise.reject(errors));

      const store = mockStore({ user: {} });
      await store.dispatch(registerUser(userData));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
