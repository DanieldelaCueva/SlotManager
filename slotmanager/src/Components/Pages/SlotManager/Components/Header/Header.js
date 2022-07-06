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
  
  return (
    <div id="header">
      <span id="dependency" onDoubleClick={authCtx.logout}>
        {JSON.parse(localStorage.getItem("userData")).username}
      </span>
      <span id="time">{utcTime}</span>
    </div>
  );
};

export default Header;
