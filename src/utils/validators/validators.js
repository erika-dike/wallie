/*
  Enforces minimum length constraints for the different fields
*/
export function getValidationState(fieldLength, minLength = 1) {
  if (fieldLength >= minLength) {
    return 'success';
  } else if (fieldLength >= 0) {
    return 'error';
  }
  return null;
}

/*
  Checks that the string supplied is valid email
  Works about 95% of the time
*/
export function validateEmail(email) {
  // regex is gotten from:
  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
