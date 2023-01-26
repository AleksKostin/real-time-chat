import React, { useState } from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChat } from '../../context/ChatApiProvider.jsx';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { getSelectChannelId } from '../../selectors.js';

const Remove = ({ show }) => {
  const { t } = useTranslation();
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const chat = useChat();
  const selectedChannelId = useSelector(getSelectChannelId);

  const handleClose = () => {
    dispatch(modalsActions.setTypeModal({ nameModal: null }));
  };

  const handleRemove = () => {
    try {
      setIsFetching(true);
      chat.removeChannel({ id: selectedChannelId });
      dispatch(modalsActions.setTypeModal({ nameModal: null }));
      toast.success(t('modalRemove.success'));
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Modal show={show} centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalRemove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalRemove.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => handleClose()}
          >
            {t('modalRemove.cancel')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => handleRemove()}
            disabled={isFetching}
          >
            {t('modalRemove.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
