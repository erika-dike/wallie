import {
  getFullTime,
  shakeButton,
} from './misc';


describe('getFullTime test suite', () => {
  it('returns result', () => {
    expect(getFullTime()).toBeDefined();
    expect(typeof getFullTime()).toEqual('string');
  });
});

describe('shakeButton test suite', () => {
  it('runs without crashing', () => {
    expect(shakeButton).not.toThrow();
  });
});
