import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginForm = () => {
  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  })
  return (
    <>
      <form className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={formik.handleSubmit}>
        <h1 className='text-center mb-4'>Войти</h1>
        <div className='form-floating mb-3'>
          <input
            name='username'
            autoComplete='username'
            required
            placeholder='Ваш ник'
            id='username'
            className='form-control'
            value={formik.values.username}
            onChange={formik.handleChange}
            autoFocus
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
          <label htmlFor='username'>Ваш ник</label>
        </div>
        <div className='form-floating mb-4'>
          <input
            name='password'
            autoComplete='current-password'
            required
            placeholder='Пароль'
            type='password'
            id='password'
            className='form-control'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <label className='form-label' htmlFor='password'>Пароль</label>
        </div>
        <button type='submit' className='w-100 mb-3 btn btn-outline-primary'>Войти</button>
      </form>
    </>
  );
};

export default LoginForm;