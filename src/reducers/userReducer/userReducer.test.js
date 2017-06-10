import userReducer from './userReducer';
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../../actions/actionTypes';
import profile from '../../fixtures/profile.json';


describe('User Reducer test suite', () => {
  let errors;
  let state;

  beforeEach(() => {
    errors = ['There are many errors'];
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
    const expectedState = { ...state, errors };
    const action = { type: REGISTER_USER_FAILED, payload: errors };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USER_REQUEST', () => {
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: FETCH_USER_REQUEST };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USER_SUCCESS', () => {
    const expectedState = { ...state, pending: false, fetched: true, profile };
    const action = { type: FETCH_USER_SUCCESS, payload: profile };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USER_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: FETCH_USER_FAILURE, payload: errors };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_PROFILE_REQUEST', () => {
    const expectedState = { ...state, pending: true, fetched: false };
    const action = { type: UPDATE_PROFILE_REQUEST };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_PROFILE_SUCCESS', () => {
    const expectedState = { ...state, pending: false, fetched: true, profile };
    const action = { type: UPDATE_PROFILE_SUCCESS, payload: profile };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_PROFILE_FAILURE', () => {
    const expectedState = { ...state, pending: false, errors };
    const action = { type: UPDATE_PROFILE_FAILURE, payload: errors };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});
