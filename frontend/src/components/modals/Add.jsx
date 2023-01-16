import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { 
  Modal,
  Button,
  Form, 
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { useChat } from '../../hooks/useChat.js';
import { actions as modalsActions} from '../../slices/modalsSlice.js';
import { useEffect } from 'react';

const Add = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const channels = useSelector((state) => channelsSelectors.selectAll(state));
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
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
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const newChannel = values.name;
      chat.addChannel({ name: newChannel });
      handleClose();
    },
  });

  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className='mb-2'
            name='name'
            autoComplete='username'
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

export default Add;