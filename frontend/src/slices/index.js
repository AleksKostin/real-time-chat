import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesSlice from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesSlice,
  },
});
