import React, { useState, useMemo } from 'react';
import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const signIn = (newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser({ username: newUser.username });
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      signIn,
      signOut,
    }),
    [
      user,
      setUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
