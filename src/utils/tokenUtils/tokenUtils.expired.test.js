/**
  A separate file would mock jwt-decode so it returns a time that has expired
**/

import {
  isTokenExpired,
  getTimeLeftForTokenExpire,
  REFRESH_THRESHOLD,
  tokenBelowRefreshThreshold,
} from './tokenUtils';

const mockTime = Math.floor(new Date().getTime() / 1000) - 3600;
jest.mock('jwt-decode', () => () => ({
  exp: mockTime,
}));

describe('isTokenValid test suite', () => {
  it('returns false for valid token', () => {
    expect(isTokenExpired()).toBe(true);
  });
});


describe('getTimeLeftForTokenExpire test suite', () => {
  it('returns time left to expire when there is a token', () => {
    expect(getTimeLeftForTokenExpire()).toBeLessThan(0);
  });

  it('returns -1 when there is no token in localStorage', () => {
    const originalLocalStorage = global.localStorage;
    global.localStorage = {
      getItem: () => null,
    };

    expect(getTimeLeftForTokenExpire()).toBe(-1);

    global.localStorage = originalLocalStorage;
  });
});

describe('tokenBelowRefreshThreshold test suite', () => {
  it('returns false', () => {
    expect(tokenBelowRefreshThreshold()).toBe(true);
  });
});
