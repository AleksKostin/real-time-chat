/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeModal: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setTypeModal: (state, action) => {
      const { nameModal, channelId } = action.payload;
      state.typeModal = nameModal || null;
      state.channelId = channelId || null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
