import React from 'react';
import { Provider } from 'react-redux';

import store from './slices/index.js';
import ChatApiProvider from './context/ChatApiProvider.jsx';
import App from './components/App.jsx';

const init = async (socket) => {
  return (
    <Provider store={store}>
      <ChatApiProvider socket={socket}>
        <App />
      </ChatApiProvider>
    </Provider>
  );
};

export default init;