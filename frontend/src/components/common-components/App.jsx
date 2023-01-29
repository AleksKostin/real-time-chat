import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import Navbar from './Navbar.jsx';
import AuthProvider from '../../context/AuthProvider.jsx';
import RequareAuth from '../../hoc/RequareAuth.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import LoginPage from '../LoginPage/LoginPage.jsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';
import SignUpPage from '../SignUpPage/SignUpPage.jsx';
import setTypeModal from '../modals/index.js';
import { getTypeModal } from '../../slices/modalsSlice.js';
import { getLoadingStatus } from '../../slices/channelsSlice.js';
import { routes } from '../../routes.js';

const App = () => {
  const loadingStatus = useSelector(getLoadingStatus);
  const typeModal = useSelector(getTypeModal);

  const renderModal = () => {
    const CurrentModal = setTypeModal(typeModal);
    return CurrentModal && <CurrentModal show={!!typeModal} />;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          {loadingStatus === 'idle' && <Navbar />}
          <Routes>
            <Route
              path={routes.homePage()}
              element={(
                <RequareAuth>
                  <HomePage />
                </RequareAuth>
            )}
            />
            <Route
              path={routes.loginPage()}
              element={(
                <RequareAuth>
                  <LoginPage />
                </RequareAuth>
            )}
            />
            <Route
              path={routes.signUpPage()}
              element={(
                <RequareAuth>
                  <SignUpPage />
                </RequareAuth>
            )}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <ToastContainer />
        {renderModal()}
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
