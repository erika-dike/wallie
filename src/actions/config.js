import axios from 'axios';


function getHeader() {
  if (localStorage.token) {
    return { Authorization: `JWT ${localStorage.token}` };
  }
  return {};
}


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: getHeader(),
});

export default api;
