import "./Header.css";
import { useState, useContext } from "react";

import AuthContext from "../../../../../store/auth-context";

const Header = (props) => {
  const [utcTime, setUtcTime] = useState(
    new Date().toUTCString().slice(-12, -4) + " UTC"
  );

  const authCtx = useContext(AuthContext);

  setTimeout(() => {
    setUtcTime(new Date().toUTCString().slice(-12, -4) + " UTC");
  }, 1000);

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
        if (data['operation_result'] === "Logout successful") {
          authCtx.logout();
        }
      });
  };

  return (
    <div id="header">
      <span id="dependency" onDoubleClick={logoutHandler}>
        {JSON.parse(localStorage.getItem("userData")).username}
      </span>
      <span id="time">{utcTime}</span>
    </div>
  );
};

export default Header;
