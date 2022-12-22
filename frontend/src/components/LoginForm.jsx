import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes.js';
import { useAuth } from '../hooks/useAuth.js';

const LoginForm = () => {
  const [isValid, setIsValid] = useState(true);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
  });

  const inputFildsClass = cn('form-control', !isValid && 'is-invalid');

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
      }
    },
  });
  return (
    <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required
          placeholder="Ваш ник"
          id="username"
          className={inputFildsClass}
          value={formik.values.username}
          onChange={formik.handleChange}
          autoFocus
        />
        {/*formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null*/}
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          className={inputFildsClass}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {/*formik.touched.password && formik.errors.password ? (
          <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
        ) : null*/}
        <label className="form-label" htmlFor="password">Пароль</label>
        {!isValid ? (
          <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
        ) : null}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
}

export default LoginForm;
