import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import { useChat } from '../../context/ChatApiProvider.jsx';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { getAllChannels } from '../../slices/channelsSlice.js';

const Add = ({ show }) => {
  const { t } = useTranslation();
  const chat = useChat();
  const dispatch = useDispatch();
  const channels = useSelector(getAllChannels);
  const inputRef = useRef();
  const [isFetching, setIsFetching] = useState(false);

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
      .min(3, 'errors.minMaxSymbol')
      .max(20, 'errors.minMaxSymbol')
      .notOneOf(channels.map((ch) => ch.name), 'errors.unique')
      .required('errors.requared'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        setIsFetching(true);
        const newChannel = values.name;
        const cleanName = leoProfanity.clean(newChannel, '*', 1);
        chat.addChannel({ name: cleanName });
      } finally {
        setIsFetching(false);
        handleClose();
        toast.success(t('modalAdd.success'));
      }
    },
  });

  return (
    <Modal show={show} centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalAdd.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className="mb-2"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            isInvalid={formik.errors.name && formik.touched.name}
            ref={inputRef}
            disabled={isFetching}
          />
          <Form.Label htmlFor="name" className="visually-hidden">{t('modalAdd.name')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {t(formik.errors.name)}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              onClick={() => handleClose()}
            >
              {t('modalAdd.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={isFetching}>
              {t('modalAdd.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
