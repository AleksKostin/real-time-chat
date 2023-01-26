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
import { useUi } from '../../context/UiProvider.jsx';
import setTypeModal from '../modals/index.js';
import { getTypeModal } from '../../selectors.js';

const App = () => {
  const { isLoading } = useUi();
  const typeModal = useSelector(getTypeModal);

  const renderModal = () => {
    const CurrentModal = setTypeModal(typeModal);
    return CurrentModal && <CurrentModal show={!!typeModal} />;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          {!isLoading && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={(
                <RequareAuth>
                  <HomePage />
                </RequareAuth>
            )}
            />
            <Route
              path="/login"
              element={(
                <RequareAuth>
                  <LoginPage />
                </RequareAuth>
            )}
            />
            <Route
              path="/signup"
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
