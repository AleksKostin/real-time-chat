import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import totaNotFound from '../../assets/totaNotFound.svg';
import { routes } from '../../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('notFound.header')} className="img-fluid h-25" src={totaNotFound} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.text')}
        <Link to={routes.homePage()}>{t('notFound.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
