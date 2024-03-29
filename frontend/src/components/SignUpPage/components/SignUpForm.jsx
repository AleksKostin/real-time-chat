import React from 'react';
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
import { routes } from '../../../routes.js';
import { useAuth } from '../../../context/AuthProvider.jsx';

const SignUpForm = () => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, 'errors.minMaxSymbol')
      .max(20, 'errors.minMaxSymbol')
      .required('errors.requared'),
    password: yup
      .string()
      .trim()
      .min(6, 'errors.minSymbol')
      .required('errors.requared'),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), null], 'errors.confirmPassword'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const newUser = {
          username: values.username,
          password: values.password,
        };
        const response = await axios.post(routes.signUpPath(), newUser);
        signIn(response.data);
        navigate(routes.homePage());
      } catch (e) {
        if (axios.isAxiosError) {
          if (e.response.status === 409) {
            setStatus('errors.registration');
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
          isInvalid={(formik.errors.username && formik.touched.username) || !!formik.status}
          disabled={formik.isSubmitting}
          autoFocus
        />
        <Form.Label htmlFor="username">{t('regForm.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {t(formik.errors.username)}
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
          isInvalid={(formik.errors.password && formik.touched.password) || !!formik.status}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {t(formik.errors.password)}
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
          disabled={formik.isSubmitting}
          isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword)
            || !!formik.status}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {t(formik.status) || t(formik.errors.confirmPassword)}
        </Form.Control.Feedback>
        <Form.Label htmlFor="confirmPassword">{t('regForm.confirmPassword')}</Form.Label>
      </Form.Floating>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={formik.isSubmitting}
      >
        {t('regForm.submit')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
