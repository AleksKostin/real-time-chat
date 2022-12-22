import React from 'react';
import { useDispatch } from 'react-redux';
import { ChatApiContext } from './index.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const ChatApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status)
    }
  });

  socket.on('newMessage', (message) => (
    dispatch(messagesActions.addMessage(message))
  ));

  const addChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status)
    }
  });

  socket.on('newChannel', (channel) => (
    dispatch(channelsActions.addChannel(channel))
  ));

  const removeChannel = (id) => socket.emit('removeChannel', id, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status)
    }
  });

  socket.on('removeChannel', (id) => (
    dispatch(channelsActions.removeChannel(id))
  ));


  return (
    <ChatApiContext.Provider value={{
      sendMessage,
      addChannel,
      removeChannel,
    }}
    >
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;