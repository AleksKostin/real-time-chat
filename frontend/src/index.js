import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';

import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const socket = io();
  const vdom = await init(socket);
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app()