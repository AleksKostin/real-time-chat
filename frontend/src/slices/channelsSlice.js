/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { routes } from '../routes.js';
import { getTokenHeader } from '../utils/utils.js';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getTokenHeader() });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const defaultChannelId = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
  loadingStatus: 'idle',
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setAll(state, channels);
        state.currentChannelId = currentChannelId;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
