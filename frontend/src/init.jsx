import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import store from './slices/index.js';
import ChatApiProvider from './context/ChatApiProvider.jsx';
import App from './components/App.jsx';
import resources from './locales/index.js'

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "ru",
    });

  return (
    <Provider store={store}>
      <ChatApiProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ChatApiProvider>
    </Provider>
  );
};

export default init;