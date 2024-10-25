import React, { createContext, useState, useContext } from 'react';

// Create Context
const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({user_id:null , accessToken:"" , refreshToken:""});

  const login = (id,AccessToken,RefreshToken) => {
    setLoginData(()=> {return {user_id:id,accessToken:AccessToken, refreshToken: RefreshToken}});
  };

  const logout = () => {
    setLoginData(()=> {return {user_id:null ,accessToken:"", refreshToken: ""}});
  };

  return (
    <UserContext.Provider value={{ loginData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = () => useContext(UserContext);