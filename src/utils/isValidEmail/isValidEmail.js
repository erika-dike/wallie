/*
  Checks that the string supplied is valid email
  Works about 95% of the time
*/
export default function validateEmail(email) {
  // regex is gotten from:
  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
