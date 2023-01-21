import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import { fetchData } from '../slices/channelsSlice.js';
import getTypeModal from '../components/modals/index.js';

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const typeModal = useSelector((state) => state.modals.typeModal);
  const fetching = useSelector((state) => state.channels.loadingStatus);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const Modal = getTypeModal(typeModal);

  return (
    fetching === 'loading'
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
          {typeModal ? <Modal /> : null}
        </div>
      )
  );
};

export default HomePage;
