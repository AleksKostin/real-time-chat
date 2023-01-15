import React from 'react';
import { useDispatch } from 'react-redux';
import { ChatApiContext } from './index.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const ChatApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('newMessage', (payload) => (
    dispatch(messagesActions.addMessage(payload))
  ));

  const addChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
    dispatch(channelsActions.setCurrentCnannelId(response.data.id));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  const removeChannel = (id) => socket.emit('removeChannel', id, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('removeChannel', (payload) => (
    dispatch(channelsActions.removeChannel(payload))
  ));

  const renameChannel = (data) => socket.emit('renameChannel', data, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('renameChannel', (payload) => {
    const { id, name } = payload;
    dispatch(channelsActions.renameChannel({ id, changes: { name }}))
  });


  return (
    <ChatApiContext.Provider value={{
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;