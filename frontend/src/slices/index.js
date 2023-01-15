import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';
import modalsSlice from './modalsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesSlice,
    modals: modalsSlice,
  },
});
