import React, { useEffect, useRef } from 'react';
import { 
  Modal,
  Button,
  Form, 
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useChat } from '../../hooks/useChat.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';

const Rename = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const channels = useSelector((state) => channelsSelectors.selectAll(state));
  const currentChannelId = useSelector((state) => state.modals.channelId);
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));

  useEffect(() => {
    inputRef.current.select();
  }, []);
  
  const handleClose = () => { 
    dispatch(modalsActions.setTypeModal({ nameModal: null }));
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels.map((ch) => ch.name), 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema,
    onSubmit: (values) => {
      const updatedName = values.name;
      chat.renameChannel({ id: currentChannelId, name: updatedName });
      handleClose();
    },
  });

  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className='mb-2'
            name='name'
            id='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            isInvalid={formik.errors.name && formik.touched.name}
            ref={inputRef}
          />
          <Form.Label htmlFor='name' className='visually-hidden'>Имя канала</Form.Label>
          <Form.Control.Feedback type='invalid'>
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className='d-flex justify-content-end'>
            <Button
              className='me-2'
              variant='secondary'
              onClick={() => handleClose()}
            >
              Отменить
            </Button>
            <Button type='submit' variant='primary'>
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;