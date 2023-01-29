import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import totaRegistration from '../../assets/totaRegistration.jpeg';
import SignUpForm from './components/SignUpForm.jsx';
import { routes } from '../../routes.js';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={totaRegistration} className="rounded-circle" alt={t('regForm.header')} />
              </div>
              <SignUpForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('regForm.haveAccount')}</span>
                <Link to={routes.loginPage()}>{t('regForm.login')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
