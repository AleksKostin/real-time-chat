import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from "react-i18next";
import leoProfanity from 'leo-profanity';

import { useChat } from '../hooks/useChat.js';
import { useAuth } from '../hooks/useAuth.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

const MessageForm = () => {
  const { t } = useTranslation()
  const chat = useChat();
  const { user } = useAuth();
  const currentChannel = useSelector((state) => {
    const currentChannelId = state.channels.currentChannelId;
    return channelsSelectors.selectById(state, currentChannelId);
  });
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannel]);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (!validationSchema.isValidSync) {
        return;
      }
      const { body } = values;
      const cleanMessage = leoProfanity.clean(body, '*', 1);
      const channelId = currentChannel.id;
      const username = user.username;
      const data = {
        body: cleanMessage,
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
          ref={inputRef}
          aria-label={t('messages.new')}
          placeholder={t('messages.input')}
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.body}
          onChange={formik.handleChange}
        />
        <button type="submit" disabled={formik.values.body.length === 0} className="btn btn-group-vertical border-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path 
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            >
            </path>
          </svg>
          <span className="visually-hidden">{t('messages.send')}</span>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;