import React from 'react';
import { Link } from 'react-router-dom';
import totaNotFound from '../assets/totaNotFound.svg'

const NotFoundPage = () => {
  return (
    <div className='text-center'>
      <img alt='Страница не найдена' className='img-fluid h-25' src={totaNotFound} />
      <h1 className='h4 text-muted'>Страница не найдена</h1>
      <p className='text-muted'>Но вы можете перейти <Link to='/'>на главную страницу</Link></p>
    </div>
  );
};

export default NotFoundPage;