import React, {
  useMemo,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { useDispatch } from 'react-redux';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const ChatApiContext = createContext({});

export const useChat = () => useContext(ChatApiContext);

const ChatApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const sendMessage = useCallback((message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  }), [socket]);

  socket.on('newMessage', (payload) => (
    dispatch(messagesActions.addMessage(payload))
  ));

  const addChannel = useCallback((channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
    dispatch(channelsActions.setCurrentCnannelId(response.data.id));
  }), [socket, dispatch]);

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  const removeChannel = useCallback((id) => socket.emit('removeChannel', id, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  }), [socket]);

  socket.on('removeChannel', (payload) => (
    dispatch(channelsActions.removeChannel(payload))
  ));

  const renameChannel = useCallback((data) => socket.emit('renameChannel', data, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  }), [socket]);

  socket.on('renameChannel', (payload) => {
    const { id, name } = payload;
    dispatch(channelsActions.renameChannel({ id, changes: { name } }));
  });

  const value = useMemo(
    () => ({
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }),
    [
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    ],
  );

  return (
    <ChatApiContext.Provider value={
      value
    }
    >
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
