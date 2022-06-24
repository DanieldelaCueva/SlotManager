import React, { useState } from "react";

const AuthContext = React.createContext({
  userLoggedIn: false,
  login: (username, password) => {},
  logout: () => {},
  private_token: "",
  public_token: "",
});

export const AuthContextProvider = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const [publicToken, setPublicToken] = useState("");

    const [privateToken, setPrivateToken] = useState("");

    const loginHandler = (username, password) => {};

    const logoutHandler = () => {};

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn: userLoggedIn,
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