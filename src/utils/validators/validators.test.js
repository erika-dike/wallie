import {
  getValidationState,
  validateEmail as isValidEmail,
} from './validators';


describe('getValidationState Test Suite', () => {
  it('returns success when fieldLength is greater than minimum length', () => {
    expect(getValidationState(10, 6)).toBe('success');
  });

  it('returns success when fieldLength is equal to minimum length', () => {
    expect(getValidationState(6, 6)).toBe('success');
  });

  it('returns error when fieldLength is less than minimum length', () => {
    expect(getValidationState(5, 6)).toBe('error');
  });

  it('returns error when fieldLength is 0', () => {
    expect(getValidationState(0, 6)).toBe('error');
  });

  it('returns null when fieldLength is less than 0', () => {
    expect(getValidationState(-1, 6)).toBeNull();
  });

  it('has minimum fieldLength of 1', () => {
    expect(getValidationState(1)).toBe('success');
  });
});

describe('isValidEmail Test Suite', () => {
  it('detects valid email: jane_doe@wallie.com', () => {
    expect(isValidEmail('jane_doe@wallie.com')).toBeTruthy();
  });

  it('detects valid email: jane_doe@gmail.com', () => {
    expect(isValidEmail('jane_doe@wallie.com')).toBeTruthy();
  });

  it('detects valid email: jane_doe@yahoo.co.uk', () => {
    expect(isValidEmail('jane_doe@yahoo.co.uk')).toBeTruthy();
  });

  it('detects valid email: jane_doe@yahoo.co.ng', () => {
    expect(isValidEmail('jane_doe@yahoo.co.ng')).toBeTruthy();
  });

  it('detects invalid email: jane_doe', () => {
    expect(isValidEmail('jane_doe')).toBeFalsy();
  });

  it('detects invalid email: jane_doe@', () => {
    expect(isValidEmail('jane_doe@')).toBeFalsy();
  });

  it('detects invalid email: jane_doe@yahoo', () => {
    expect(isValidEmail('jane_doe@yahoo')).toBeFalsy();
  });

  it('detects invalid email: jane_doe.com', () => {
    expect(isValidEmail('jane_doe.com')).toBeFalsy();
  });

  it('detects invalid email: jane_doe@com', () => {
    expect(isValidEmail('jane_doe@com')).toBeFalsy();
  });

  it('thinks is valid email: jane_doe@com.ng', () => {
    expect(isValidEmail('jane_doe@com.ng')).toBeTruthy();
  });
});


