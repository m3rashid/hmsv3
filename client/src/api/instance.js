import axios from 'axios';
import io from 'socket.io-client';
import { invoke } from '@tauri-apps/api/tauri';

export const isDesktopApp = !!window.__TAURI__;

const defaultServerUrl = 'http://localhost:5000';

let serverRootUrl;

if (isDesktopApp) {
  invoke('get_environment_variable', { name: 'hmsv3_HOST_IP' })
    .then((hostIp) => {
      if (hostIp) serverRootUrl = 'http://' + hostIp + ':5000';
      else serverRootUrl = defaultServerUrl;
    })
    .catch(console.log);
} else serverRootUrl = defaultServerUrl;

export const instance = axios.create({
  baseURL: serverRootUrl + '/api',
});

export let socket = io(serverRootUrl, {
  transports: ['websocket'],
  autoConnect: false,
  auth: {
    token: localStorage.getItem('refresh_token'),
  },
});

window.setTimeout(() => {
  instance.defaults.baseURL = serverRootUrl + '/api';

  socket = io(serverRootUrl, {
    autoConnect: false,
    auth: {
      token: localStorage.getItem('refresh_token'),
    },
  });
}, 500);
