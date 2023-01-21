import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar.jsx';
import AuthProvider from '../context/AuthProvider.jsx';
import RequareAuth from '../hoc/RequareAuth.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';

const App = () => {
  const fetching = useSelector((state) => state.channels.loadingStatus);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          {fetching !== 'loading' && <Navbar />}
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
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
