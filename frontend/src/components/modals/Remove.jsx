import React from 'react';
import { 
  Modal,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

import { useChat } from '../../hooks/useChat.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const chat = useChat();
  const currentChannelId = useSelector((state) => state.modals.channelId);

  const handleClose = () => { 
    dispatch(modalsActions.setTypeModal({ nameModal: null }));
  };

  const handleRemove = () => {
    chat.removeChannel({ id: currentChannelId });
    dispatch(modalsActions.setTypeModal({ nameModal: null }));
    toast.success(t('modalRemove.success'));
  };

  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalRemove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>{t('modalRemove.sure')}</p>
        <div className='d-flex justify-content-end'>
          <Button
            className='me-2'
            variant='secondary'
            onClick={() => handleClose()}
          >
            {t('modalRemove.cancel')}
          </Button>
          <Button type='submit' variant='danger' onClick={() => handleRemove()}>
            {t('modalRemove.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;