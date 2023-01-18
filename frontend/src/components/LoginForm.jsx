import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import { routes } from '../routes.js';
import { useAuth } from '../hooks/useAuth.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(true);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().trim(),
    password: yup.string().trim(),
  });

  const inputFieldsClass = cn('form-control', !isValid && 'is-invalid');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        signIn(response.data);
        navigate('/');
      } catch (e) {
        if (axios.isAxiosError) {
          if (e.response.status === 401) {
            setIsValid(false);
          }
        }
        console.log(e);
      }
    },
  });
  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('logForm.header')}</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required
          placeholder={t('logForm.username')}
          id="username"
          className={inputFieldsClass}
          value={formik.values.username}
          onChange={formik.handleChange}
          autoFocus
        />
        {/*formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null*/}
        <label htmlFor="username">{t('logForm.username')}</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required
          placeholder={t('logForm.password')}
          type="password"
          id="password"
          className={inputFieldsClass}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {/*formik.touched.password && formik.errors.password ? (
          <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
        ) : null*/}
        <label className="form-label" htmlFor="password">{t('logForm.password')}</label>
        {!isValid
          ? (
            <div className="invalid-tooltip">{t('errors.auth')}</div>
          )
          :
            null
        }
      </div>
      <button
        type="submit"
        className="w-100 mb-3 btn btn-outline-primary"
      >
        {t('logForm.submit')}
      </button>
    </form>
  );
}

export default LoginForm;
