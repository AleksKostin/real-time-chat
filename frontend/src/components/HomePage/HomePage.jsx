import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import { routes } from '../../routes.js';
import { useAuth } from '../../context/AuthProvider.jsx';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import { useUi } from '../../context/UiProvider.jsx';

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getTokenHeader, signOut } = useAuth();
  const { isLoading, setLoading } = useUi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(routes.dataPath(), { headers: getTokenHeader() });
        dispatch(channelsActions.setInitialState(response.data));
        dispatch(messagesActions.setInitialState(response.data));
      } catch (e) {
        if (axios.isAxiosError) {
          if (e.response.status === 401) {
            signOut();
            navigate('/');
            toast.error(t('errors.authorization'));
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(t('errors.unknown'));
          throw e;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    isLoading
      ? (
        <div className="justify-content-center align-self-center flex-column h-100 d-flex">
          <Spinner animation="grow" variant="secondary">
            <span className="visually-hidden">{t('spinner.loading')}</span>
          </Spinner>
        </div>
      )
      : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Messages />
          </div>
        </div>
      )
  );
};

export default HomePage;
