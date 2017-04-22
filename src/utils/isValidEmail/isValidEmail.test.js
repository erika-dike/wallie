import isValidEmail from './isValidEmail';


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
