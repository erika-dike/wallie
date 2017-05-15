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
