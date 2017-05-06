import jwtDecode from 'jwt-decode';


const REFRESH_THRESHOLD = 120;


/**
  returns the time left till token expires
**/
function getTimeLeftToExpire(token) {
  const expiryTime = jwtDecode(token).exp;
  const now = Math.floor(new Date().getTime() / 1000);
  const timeLeftToExpire = expiryTime - now;
  return timeLeftToExpire;
}


/**
  Checks if the token is close to expiry based on a threshold
**/
export default function tokenBelowRefreshThreshold() {
  const timeLeftToExpire = getTimeLeftToExpire(localStorage.token);

  if (timeLeftToExpire < REFRESH_THRESHOLD) {
    return true;
  }
  return false;
}
