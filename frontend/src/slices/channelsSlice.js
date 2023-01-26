/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      const { id } = action.payload;
      const currentId = state.currentChannelId;
      channelsAdapter.removeOne(state, id);
      state.currentChannelId = currentId === id ? defaultChannelId : currentId;
    },
    setCurrentCnannelId: (state, action) => {
      const id = action.payload;
      state.currentChannelId = id;
    },
    renameChannel: channelsAdapter.updateOne,
    setInitialState: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      channelsAdapter.setAll(state, channels);
      state.currentChannelId = currentChannelId;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
