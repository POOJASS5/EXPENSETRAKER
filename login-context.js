import React, { useState } from "react";

const loginContext = React.createContext({
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
});

export const LoginContextProvider = (props) => {
  const logingData = localStorage.getItem("idToken") ? true : false;
  const [loggedIn, setLoggedIn] = useState(logingData);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("idToken");
    setLoggedIn(false);
  };

  const loginContextValue = {
    isLoggedIn: loggedIn,
    login: login,
    logout: logout,
  };

  return (
    <loginContext.Provider value={loginContextValue}>
      {props.children}
    </loginContext.Provider>
  );
};

export default loginContext;