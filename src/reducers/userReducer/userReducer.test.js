import userReducer from './userReducer';
import {
  REGISTER_USER_FAILED,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS,
} from '../../actions/types';

describe('User Reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      errors: [],
      user: null,
      registering: false,
      registered: false,
    };
  });

  it('should return the initial state', () => {
    const expectedState = { ...state };
    expect(userReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_PENDING', () => {
    const expectedState = { ...state, registering: true };
    const action = { type: REGISTER_USER_PENDING };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_SUCCESS', () => {
    const userData = {
      first_name: 'Erika',
      last_name: 'Dike',
      username: 'erika_dike',
      email: 'rikkydyke@yahoo.co.uk',
      password1: 'master',
      password2: 'master',
      about: 'Engineer @andela',
      profile_pic: '',
    };
    const expectedState = { ...state, user: userData, registered: true };
    const action = { type: REGISTER_USER_SUCCESS, payload: userData };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_FAILED', () => {
    const errors = {
      response: {
        data: ['There are many errors'],
      },
    };
    const expectedState = { ...state, errors: errors.response.data };
    const action = { type: REGISTER_USER_FAILED, payload: errors };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('REGISTER_USER_FAILED handles network errors', () => {
    const errors = {
      status: 400,
      message: 'Network Error',
      response: undefined,
    };
    const message = [
      'Something seems to be wrong with the network. Please try again',
    ];
    const expectedState = { ...state, errors: message };
    const action = { type: REGISTER_USER_FAILED, payload: errors };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});
