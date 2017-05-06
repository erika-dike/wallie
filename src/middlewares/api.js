import api from '../actions/config';
import { logoutUser, refreshToken, toggleLoginModal } from '../actions/';
import { tokenBelowRefreshThreshold } from '../utils/';

const UNAUTHORIZED = 'unauthorized';


function callApi(endpoint, httpMethod, authenticated) {
  const token = localStorage.getItem('token') || null;
  let config = {};

  if (authenticated) {
    if (token) {
      config = {
        headers: { Authorization: `JWT ${token}` },
      };
    } else {
      throw new Error(UNAUTHORIZED);
    }
  }

  return api[httpMethod](endpoint, config)
    .then(
      response => response.data,
      (error) => {
        if (error.response.status === 401) {
          throw new Error(UNAUTHORIZED);
        }
      },
    )
    .then();
}

export const CALL_API = Symbol('Call API');


export default store => next => action => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, httpMethod, types, authenticated } = callAPI;

  const [requestType, successType, errorType] = types;

  // Passing the authenticated boolean back in out data will let us distinguish
  // between normal and secret quotes
  next({ type: requestType });
  return callApi(endpoint, httpMethod, authenticated)
    .then(
      response => next({ payload: response, type: successType }),
      (error) => {
        if (error.message === UNAUTHORIZED) {
          next(logoutUser());
          next(toggleLoginModal(true, ['You have to log in to continue']));
          console.log(`This is ${UNAUTHORIZED}`);
          // throw new Error(UNAUTHORIZED);
        } else {
          next({
            error: error.message || 'There was an error',
            type: errorType,
          });
        }
      },
    )
    .then((response) => {
      // refresh token if below threshbold
      if (tokenBelowRefreshThreshold()) {
        next(refreshToken());
      }
      return response;
    });
};
