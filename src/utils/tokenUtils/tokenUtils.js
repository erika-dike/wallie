import jwtDecode from 'jwt-decode';


export const REFRESH_THRESHOLD = 120;


/**
  returns the time left till token expires
**/
export function getTimeLeftForTokenExpire() {
  const token = localStorage.getItem('token');
  if (token) {
    const expiryTime = jwtDecode(token).exp;
    const now = Math.floor(new Date().getTime() / 1000);
    const timeLeftToExpire = expiryTime - now;
    return timeLeftToExpire;
  }
  return -1;
}


/**
  Checks if the token is close to expiry based on a threshold
**/
export function tokenBelowRefreshThreshold() {
  const timeLeftToExpire = getTimeLeftForTokenExpire();

  if (timeLeftToExpire < REFRESH_THRESHOLD) {
    return true;
  }
  return false;
}

/**
  Checks if token has expired
**/
export function isTokenExpired() {
  const timeLeftToExpire = getTimeLeftForTokenExpire();

  if (timeLeftToExpire < 0) {
    return true;
  }
  return false;
}
