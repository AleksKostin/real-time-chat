/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setInitialState: (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.addMany(state, messages);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        const filtredMessages = Object.values(state.entities)
          .filter((mes) => (mes.channelId === id))
          .map((mes) => mes.id);
        messagesAdapter.removeMany(state, filtredMessages);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
