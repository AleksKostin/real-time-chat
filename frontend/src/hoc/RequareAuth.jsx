import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hook/useAuth.jsx';

const RequareAuth = ({ children, fromHome }) => {
  const { user } = useAuth();
  const location = useLocation();

  console.log(location)
  if (location.pathname === '/') {
    return !user ? <Navigate to='/login' /> : children;
  }
  return !user ? children : <Navigate to='/' />;
}

export default RequareAuth;