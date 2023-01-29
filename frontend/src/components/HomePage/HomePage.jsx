import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import { useAuth } from '../../context/AuthProvider.jsx';
import {
  getLoadingStatus,
  getFetchError,
  fetchData,
  actions,
} from '../../slices/channelsSlice.js';

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getTokenHeader, signOut } = useAuth();
  const fetchError = useSelector(getFetchError);
  const loadingStatus = useSelector(getLoadingStatus);

  useEffect(() => {
    dispatch(fetchData(getTokenHeader()));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (fetchError === 'errors.authorization') {
      signOut();
      toast.error(t(fetchError));
    } else if (fetchError === 'errors.network') {
      toast.error(t(fetchError));
    } else if (fetchError === 'errors.unknown') {
      toast.error(t(fetchError));
    }

    return () => {
      dispatch(actions.refreshFailedState());
    };
  }, [fetchError]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    loadingStatus !== 'idle'
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
