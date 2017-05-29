import 'jest-enzyme';
import { jsdom } from 'jsdom';

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBoeW5vIiwib3JpZ19pYXQiOjE0OTYwNjM3MjAsInVzZXJfaWQiOjUwLCJlbWFpbCI6InJpa2t5ZHlrZUB5YWhvby5jby51ayIsImV4cCI6MTQ5NjA2NDY2OH0.6MqV_WZm1L4LF49JwMhm2dY50EXasdxXLGsWKeDAzuE';
global.document = jsdom(documentHTML);
global.document.getElementById = () => ({
  classList: {
    add: className => [className],
    remove: className => [],
  },
});

global.localStorage = {
  getItem: (name) => {
    if (name === 'token') {
      return token;
    }
    return name;
  },
};
