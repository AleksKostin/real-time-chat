import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthProvider.jsx';
import { routes } from '../../routes.js';

const Navbar = () => {
  const { t } = useTranslation();

  const { user, signOut } = useAuth();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to={routes.homePage()}>{t('navbar.logo')}</Link>
        {!!user
          && (
          <button
            onClick={signOut}
            type="button"
            className="btn btn-primary"
          >
            {t('navbar.logOut')}
          </button>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
