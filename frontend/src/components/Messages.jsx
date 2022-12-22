import React from 'react';
import { useSelector } from 'react-redux';

import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import MessageForm from './MessageForm.jsx';

const Messages = () => {
  const currentChannel = useSelector((state) => {
    const currentChannelId = state.channels.currentChannelId;
    return channelsSelectors.selectById(state, currentChannelId);
  });

  const currentMessages = useSelector((state) => {
    return messagesSelectors.selectAll(state).filter((m) => m.channelId === currentChannel.id)
  });
 
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannel?.name}</b></p>
          <span className="text-muted">{`${currentMessages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {currentMessages.map((m) => (
            <div key={m.id} className="text-break mb-2">
              <b>{m.username}</b>
              {`: ${m.body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  );
}

export default Messages;
