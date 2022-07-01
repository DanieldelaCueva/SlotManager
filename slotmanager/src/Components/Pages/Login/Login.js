import "./Login.css";

import AuthContext from "../../../store/auth-context";

import { useRef, useContext, useState } from "react";

const Login = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const authCtx = useContext(AuthContext);

  const [loginError, setLoginError] = useState(null);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8000/authentication/login/", {
      method: "POST",
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
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
          const userData = {
            username: data.username,
            private_token: data.private_token,
            public_token: data.public_token,
            user_room: data.room,
            is_admin: data.is_admin === "True",
          };
          authCtx.login(userData);
        }
      });
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
            className="form_component__input"
            ref={usernameRef}
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

        {loginError && <span className="form_component__error_message">{loginError}</span>}
      </div>
    </div>
  );
};

export default Login;
