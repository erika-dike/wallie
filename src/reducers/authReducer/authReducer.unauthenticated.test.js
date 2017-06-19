import authReducer from './authReducer';

jest.mock('../../utils', () => ({
  isTokenExpired: () => false,
}));


describe('Auth reducer test suite', () => {
  let state;

  beforeEach(() => {
    state = {
      errors: [],
      loading: false,
      isAuthenticated: true,
      showLoginModal: false,
    };
  });

  it('should return the initial state', () => {
    const expectedState = { ...state };
    expect(authReducer(undefined, {})).toEqual(expectedState);
  });
});
