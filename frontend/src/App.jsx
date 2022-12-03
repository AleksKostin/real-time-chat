import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import RequareAuth from './hoc/RequareAuth.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='d-flex flex-column h-100'>
          <Navbar />
          <Routes>
            <Route path='/' element={
              <RequareAuth>
                <HomePage />
              </RequareAuth>
            } />
            <Route path='/login' element={
              <RequareAuth>
                <LoginPage />
              </RequareAuth>
            } />
            <Route path='/signup' element={
              <RequareAuth>
                <SignUpPage />
              </RequareAuth>
            } />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
