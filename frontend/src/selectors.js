import { selectors as channelsSelectors } from './slices/channelsSlice.js';
import { selectors as messagesSelectors } from './slices/messagesSlice.js';

export const getAllChannels = (state) => channelsSelectors.selectAll(state);

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getCurrentChannel = (state) => (
  channelsSelectors.selectById(state, getCurrentChannelId(state))
);

export const getCurrentMessages = (state) => {
  const allMessages = messagesSelectors.selectAll(state);
  const currentChannelId = getCurrentChannelId(state);
  return allMessages.filter((m) => m.channelId === currentChannelId);
};

export const getTypeModal = (state) => state.modals.typeModal;

export const getSelectChannelId = (state) => state.modals.channelId;
