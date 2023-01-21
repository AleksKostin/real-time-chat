import React, { useState } from 'react';
import {
  Button,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { routes } from '../routes.js';
import { useAuth } from '../hooks/useAuth.js';

const SignUpForm = () => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [regError, setRegError] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, t('errors.minMaxSymbol'))
      .max(20, t('errors.minMaxSymbol'))
      .required(t('errors.requared')),
    password: yup
      .string()
      .trim()
      .min(6, t('errors.minSymbol'))
      .required(t('errors.requared')),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), null], t('errors.confirmPassword')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setRegError(false);
        const newUser = {
          username: values.username,
          password: values.password,
        };
        const response = await axios.post(routes.signUpPath(), newUser);
        signIn(response.data);
        navigate('/');
      } catch (e) {
        console.log(e);
        if (axios.isAxiosError) {
          if (e.response.status === 409) {
            setRegError(t('errors.registration'));
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(t('errors.unknown'));
          throw e;
        }
      }
    },
  });

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('regForm.header')}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          placeholder={t('regForm.username')}
          name="username"
          autoComplete="username"
          required
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={(formik.errors.username && formik.touched.username) || !!regError}
          autoFocus
        />
        <Form.Label htmlFor="username">{t('regForm.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Floating>
      <Form.Floating className="mb-3">
        <Form.Control
          placeholder={t('regForm.password')}
          name="password"
          aria-describedby="passwordHelpBlock"
          required
          type="password"
          id="password"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={(formik.errors.password && formik.touched.password) || !!regError}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {formik.errors.password}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">{t('regForm.password')}</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          placeholder={t('regForm.confirmPassword')}
          name="confirmPassword"
          required
          autoComplete="new-password"
          type="password"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword)
            || !!regError}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {regError || formik.errors.confirmPassword}
        </Form.Control.Feedback>
        <Form.Label htmlFor="confirmPassword">{t('regForm.confirmPassword')}</Form.Label>
      </Form.Floating>
      <Button type="submit" variant="outline-primary" className="w-100">
        {t('regForm.submit')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
