import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import store from './slices/index.js';
import ChatApiProvider from './context/ChatApiProvider.jsx';
import App from './components/App.jsx';
import resources from './locales/index.js'
import rollbarConfig from './rollbarConfig.js';


const init = async (socket) => {
  const i18n = i18next.createInstance();
  console.log(process.env.REACT_APP_ACCESS_TOKEN)
  console.log(process.env.NODE_ENV)

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "ru",
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ChatApiProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ChatApiProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;