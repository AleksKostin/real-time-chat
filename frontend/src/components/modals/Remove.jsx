import React from 'react';
import { 
  Modal,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useChat } from '../../hooks/useChat.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Remove = () => {
  const dispatch = useDispatch();
  const chat = useChat();
  const currentChannelId = useSelector((state) => state.modals.channelId);

  const handleClose = () => { 
    dispatch(modalsActions.setTypeModal({ nameModal: null }));
  };

  const handleRemove = () => {
    chat.removeChannel({ id: currentChannelId });
    dispatch(modalsActions.setTypeModal({ nameModal: null }));
  };

  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>Уверены?</p>
        <div className='d-flex justify-content-end'>
          <Button
            className='me-2'
            variant='secondary'
            onClick={() => handleClose()}
          >
            Отменить
          </Button>
          <Button type='submit' variant='danger' onClick={() => handleRemove()}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;