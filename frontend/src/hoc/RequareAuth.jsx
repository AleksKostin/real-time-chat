import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const RequareAuth = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === '/') {
    return !user ? <Navigate to="/login" /> : children;
  }
  return !user ? children : <Navigate to="/" />;
}

export default RequareAuth;
