import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useChat } from '../hooks/useChat.js';
import { useAuth } from '../hooks/useAuth.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

const MessageForm = () => {
  const chat = useChat();
  const { user } = useAuth();
  const currentChannel = useSelector((state) => {
    const currentChannelId = state.channels.currentChannelId;
    return channelsSelectors.selectById(state, currentChannelId);
  });


  const validationSchema = yup.object().shape({
    body: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { body } = values;
      const channelId = currentChannel.id;
      const username = user.username;
      const data = {
        body,
        channelId,
        username,
      };
      chat.sendMessage(data);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.body}
          onChange={formik.handleChange}
        />
        <button type="submit" disabled={formik.values.body.length === 0} className="btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path 
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            >
            </path>
          </svg>
          <span className="visually-hidden">Отправить</span>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;