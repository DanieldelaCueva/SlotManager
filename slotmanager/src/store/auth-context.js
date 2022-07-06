import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  userLoggedIn: false,
  userIsAdmin: false,
  private_token: "",
  public_token: "",
  loginError: null,
  login: (username, password) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [publicToken, setPublicToken] = useState("");

  const [privateToken, setPrivateToken] = useState("");

  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const loginHandler = (username, password) => {
    fetch("http://127.0.0.1:8000/authentication/login/", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          setLoginError("Incorrect username or password");
        } else if (response.status === 500) {
          setLoginError("Server error");
        }
      })
      .then((data) => {
        if (data["error"] !== "Invalid credentials") {
          setUserLoggedIn(true);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              username: data.username,
              private_token: data.private_token,
              public_token: data.public_token,
              user_room: data.room,
              is_admin: data.is_admin === "True",
            })
          );
          history.go(0);
        }
      });
  };

  const logoutHandler = () => {
    fetch("http://127.0.0.1:8000/authentication/logout/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("userData")).private_token
        }`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data["operation_result"] === "Logout successful") {
          setUserLoggedIn(false);
          localStorage.removeItem("userData");
        }
      });
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
        loginError: loginError,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
