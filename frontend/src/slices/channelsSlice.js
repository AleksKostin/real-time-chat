/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { routes } from '../routes.js';

const channelsAdapter = createEntityAdapter();

export const fetchData = createAsyncThunk(
  'fetchData',
  async (tokenHeader, thunkAPI) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers: tokenHeader });
      return response.data;
    } catch (e) {
      if (axios.isAxiosError) {
        if (e.response.status === 401) {
          console.log(e);
          return thunkAPI.rejectWithValue('errors.authorization');
        }
        console.log(e);
        return thunkAPI.rejectWithValue('errors.network');
      }
      console.log(e);
      return thunkAPI.rejectWithValue('errors.unknown');
    }
  },
);

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
    refreshFailedState: (state) => {
      state.error = null;
      state.loadingStatus = 'idle';
    },
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
        // console.log(action.payload)
        state.error = action.payload;
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const getAllChannels = (state) => selectors.selectAll(state);
export const getCurrentChannelId = (state) => state.channels.currentChannelId;
export const getCurrentChannel = (state) => (
  selectors.selectById(state, getCurrentChannelId(state))
);
export const getLoadingStatus = (state) => state.channels.loadingStatus;
export const getFetchError = (state) => state.channels.error;
