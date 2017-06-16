import jsdom from 'jsdom';

import {
  RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET,
  RECEIVED_POST_DELETE_VIA_WEBSOCKET,
  RECEIVED_POST_UPDATE_VIA_WEBSOCKET,
} from '../../actions/actionTypes';
import store from '../../store';


jest.mock('reconnecting-websocket', () => {
  return function (url) {
    return {
      // noopen
      url,
    };
  };
});


jest.mock('../../store', () => ({
  dispatch: jest.fn(() => 'dispatch'),
}));


describe('openWebSocket test suite', () => {
  let openWebSocket;
  let socket;

  describe('public mode test', () => {
    beforeEach(() => {
      openWebSocket = require('./webSocketService').default;
      socket = openWebSocket();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('returns the right websocket protocol', () => {
      expect(socket.url.split('/')[0]).toEqual('ws:');
    });

    it('creates RECEIVED_POST_UPDATE_VIA_WEBSOCKET if mode is public', () => {
      const response = {
        data: '{"type": "post_update", "data": {}}',
      };
      socket.onmessage(response);
      const expectedState = {
        type: RECEIVED_POST_UPDATE_VIA_WEBSOCKET,
        payload: {},
      };
      expect(store.dispatch).toHaveBeenCalledWith(expectedState);
    });

    it('creates RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET if mode is public', () => {
      const response = {
        data: '{"type": "love_update", "data": {}}',
      };
      socket.onmessage(response);
      const expectedState = {
        type: RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET,
        payload: {},
      };
      expect(store.dispatch).toHaveBeenCalledWith(expectedState);
    });

    it('creates RECEIVED_LOVE_UPDATE_VIA_WEBSOCKET if mode is public', () => {
      const response = {
        data: '{"type": "post_delete", "data": {}}',
      };
      socket.onmessage(response);
      const expectedState = {
        type: RECEIVED_POST_DELETE_VIA_WEBSOCKET,
        payload: {},
      };
      expect(store.dispatch).toHaveBeenCalledWith(expectedState);
    });
  });

  describe('private mode test', () => {
    beforeEach(() => {
      openWebSocket = require('./webSocketService').default;
      socket = openWebSocket('private');
    });

    it('does not create RECEIVED_POST_UPDATE_VIA_WEBSOCKET if mode is private',
    () => {
      const response = {
        data: '{"type": "post_update", "data": {}}',
      };
      socket.onmessage(response);
      const expectedState = {
        type: RECEIVED_POST_UPDATE_VIA_WEBSOCKET,
        payload: {},
      };
      expect(store.dispatch).not.toHaveBeenCalledWith(expectedState);
    });

    it('does not create RECEIVED_POST_UPDATE_VIA_WEBSOCKET if mode is private',
    () => {
      const response = {
        data: '{"type": "post_update", "data": {}}',
      };
      socket.onmessage(response);
      const expectedState = {
        type: RECEIVED_POST_UPDATE_VIA_WEBSOCKET,
        payload: {},
      };
      expect(store.dispatch).not.toHaveBeenCalledWith(expectedState);
    });
  });
});
