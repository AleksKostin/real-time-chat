import React, { useState } from 'react';
import { 
  Button,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { routes } from '../routes.js';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup
      .string()
      .trim()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
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
        const newUser = {
          username: values.username,
          password: values.password,
        };
        const response = await axios.post(routes.signUpPath(), newUser);
        signIn(response.data);
        navigate('/');
      } catch (e) {
        console.log(e)
      }
    }
  });

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          placeholder="Имя пользователя"
          name="username"
          autocomplete="username"
          required
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.errors.username && formik.touched.username}
          autoFocus
        />
        <Form.Label htmFor="username">Имя пользователя</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Floating>
      <Form.Floating className="mb-3">
        <Form.Control
          placeholder="Пароль"
          name="password"
          aria-describedby="passwordHelpBlock"
          required
          type="password"
          id="password"
          autocomplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.errors.password && formik.touched.password}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {formik.errors.password}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">Пароль</Form.Label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          placeholder="Подтвердите пароль"
          name="confirmPassword"
          required
          autocomplete="new-password"
          type="password"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
        />
        <Form.Control.Feedback type="invalid" tooltip placement="right">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
        <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
      </Form.Floating>
      <Button type="submit" variant="outline-primary" className="w-100">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default SignUpForm;