import WebSocket from 'reconnecting-websocket';

import {
  receiveWebSocketLoveUpdate,
  receiveWebSocketPostDelete,
  receiveWebSocketPostUpdate,
} from '../../actions/';

import store from '../../store';


export default function openWebSocket(mode = 'public') {
  const { protocol } = window.location;
  const wsScheme = protocol === 'https:' ? 'wss' : 'ws';
  const apiHost = process.env.REACT_APP_API_URL.replace(`${protocol}//`, '');

  const socket = new WebSocket(
    `${wsScheme}://${apiHost}core/posts/stream/`,
  );

  socket.onopen = () => console.log(`Connected to ${mode} post socket`);

  socket.onmessage = (response) => {
    console.log('RECEIVED MESSAGE ON WEBSOCKET');
    const payload = JSON.parse(response.data);
    if (payload.type === 'post_update' && mode === 'public') {
      store.dispatch(receiveWebSocketPostUpdate(payload.data));
    } else if (payload.type === 'love_update') {
      store.dispatch(receiveWebSocketLoveUpdate(payload.data));
    } else if (payload.type === 'post_delete' && 'public') {
      store.dispatch(receiveWebSocketPostDelete(payload.data));
    }
  };
  socket.onerror = err => console.log('Error: ', err);

  socket.close = () => console.log(`Disconnected from ${mode} post socket`);

  return socket;
}
