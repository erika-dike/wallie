import userReducer from './userReducer';
import {
  REGISTER_USER_FAILED,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS,
} from '../../actions/actionTypes';

describe('User Reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      errors: [],
      fetched: false,
      pending: false,
      profile: null,
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
    const expectedState = { ...state, profile: null, registered: true };
    const action = { type: REGISTER_USER_SUCCESS, payload: userData };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle REGISTER_USER_FAILED', () => {
    const errors = ['There are many errors'];
    const expectedState = { ...state, errors };
    const action = { type: REGISTER_USER_FAILED, payload: errors };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});
