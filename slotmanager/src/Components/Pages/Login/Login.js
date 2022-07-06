import "./Login.css";

import AuthContext from "../../../store/auth-context";

import { useRef, useContext, useState } from "react";

const Login = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(AuthContext);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    authCtx.login(usernameRef.current.value.toUpperCase(), passwordRef.current.value)
  };

  return (
    <div id="middle">
      <div className="form-wrapper">
        <form onSubmit={formSubmitHandler}>
          <h3 id="login_title">LOGIN TO SLOT MANAGER</h3>

          <label htmlFor="username" className="form_component__label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form_component__input"
            ref={usernameRef}
            style={{ textTransform: "uppercase" }}
            required
          />

          <label htmlFor="password" className="form_component__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form_component__input"
            ref={passwordRef}
            required
          />

          <input
            type="submit"
            value="LOGIN"
            className="form_component__input__submit"
          />
        </form>

        {authCtx.loginError && (
          <span className="form_component__error_message">{authCtx.loginError}</span>
        )}
      </div>
    </div>
  );
};

export default Login;
