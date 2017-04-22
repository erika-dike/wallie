import 'jest-enzyme';
import { jsdom } from 'jsdom';

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
global.document = jsdom(documentHTML);
global.document.getElementById = () => ({
  classList: {
    add: className => [className],
    remove: className => [],
  },
});
