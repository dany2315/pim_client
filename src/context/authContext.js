import React, { createContext, useState } from 'react';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = (token) => {
    // Stocker le JWT dans le local storage ou le cookie
    // Set isAuthenticated à true
    localStorage.setItem('tokNCS', token);
    setIsAuthenticated(true)
  };

  const logout = () => {
    // Supprimer le JWT du local storage ou du cookie
    // Set isAuthenticated à false
    localStorage.setItem('tokNCS', "");
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
