import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Stocker le JWT dans le local storage ou le cookie
    // Set isAuthenticated à true

    setIsAuthenticated(true)
  };

  const logout = () => {
    // Supprimer le JWT du local storage ou du cookie
    // Set isAuthenticated à false
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
