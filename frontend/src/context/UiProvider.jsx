import React, {
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';

const UiContext = createContext({});

export const useUi = () => useContext(UiContext);

const UiProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading) => setIsLoading(loading);

  const value = useMemo(
    () => ({
      isLoading,
      setLoading,
    }),
    [
      isLoading,
    ],
  );

  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  );
};

export default UiProvider;
