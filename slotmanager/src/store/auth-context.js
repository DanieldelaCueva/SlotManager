import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  userLoggedIn: false,
  userIsAdmin: false,
  private_token: "",
  public_token: "",
  login: (userData) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [publicToken, setPublicToken] = useState("");

  const [privateToken, setPrivateToken] = useState("");

  const history = useHistory();

  const loginHandler = (userData) => {
    setUserLoggedIn(true);
    localStorage.setItem("userData", JSON.stringify(userData));
    history.go(0);
  };

  const logoutHandler = () => {
    setUserLoggedIn(false);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    setUserLoggedIn(storedUser);
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      fetch(
        `http://127.0.0.1:8000/authentication/check-login/${
          JSON.parse(localStorage.getItem("userData")).username
        }`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data["operation_result"] === "false") {
            logoutHandler();
          }
        });
    }
  });

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn: userLoggedIn,
        userIsAdmin: localStorage.getItem("userData")
          ? JSON.parse(localStorage.getItem("userData")).is_admin
          : false,
        private_token: privateToken,
        public_token: publicToken,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
