import React, {
  useState,
  useMemo,
  createContext,
  useContext,
} from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

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

  const getTokenHeader = () => {
    const dataUser = JSON.parse(localStorage.getItem('user'));
    if (dataUser && dataUser.token) {
      return { Authorization: `Bearer ${dataUser.token}` };
    }
    return {};
  };

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      getTokenHeader,
    }),
    [
      user,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
