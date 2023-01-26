import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

import { useChat } from '../../context/ChatApiProvider.jsx';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { getAllChannels, getSelectChannelId } from '../../selectors.js';

const Rename = ({ show }) => {
  const { t } = useTranslation();
  const [isFetching, setIsFetching] = useState(false);
  const chat = useChat();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const channels = useSelector(getAllChannels);
  const selectedChannelId = useSelector(getSelectChannelId);
  const currentChannel = channels.find((channel) => channel.id === selectedChannelId);

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
      .min(3, 'errors.minMaxSymbol')
      .max(20, 'errors.minMaxSymbol')
      .notOneOf(channels.map((ch) => ch.name), 'errors.unique')
      .required('errors.requared'),
  });

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        setIsFetching(true);
        const updatedName = values.name;
        const cleanName = leoProfanity.clean(updatedName, '*', 1);
        chat.renameChannel({ id: selectedChannelId, name: cleanName });
        handleClose();
        toast.success(t('modalRename.success'));
      } finally {
        setIsFetching(false);
      }
    },
  });

  return (
    <Modal show={show} centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalRename.header')}</Modal.Title>
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
          <Form.Label htmlFor="name" className="visually-hidden">{t('modalRename.name')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {t(formik.errors.name)}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              onClick={() => handleClose()}
            >
              {t('modalRename.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={isFetching}>
              {t('modalRename.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
