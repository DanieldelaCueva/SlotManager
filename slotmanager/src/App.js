import { Switch, Route, Redirect } from "react-router-dom";

import SlotManager from "./Components/Pages/SlotManager/SlotManager";
import Login from "./Components/Pages/Login/Login";

import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Admin from "./Components/Pages/Admin/Admin";
import CustomContainer from "./Components/Wrappers/CustomContainer/CustomContainer";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      {!authCtx.userLoggedIn && (
        <Route path="/login">
          <CustomContainer>
            <div
              style={{
                display: "table",
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
                width: "100%",
              }}
            >
              <Login />
            </div>
          </CustomContainer>
        </Route>
      )}

      {authCtx.userLoggedIn && !authCtx.userIsAdmin && (
        <Route path="/slot-board">
          <CustomContainer>
            <div
              style={{ padding: "0rem 10rem 0rem 10rem", minHeight: "100%" }}
            >
              <SlotManager />
            </div>
          </CustomContainer>
        </Route>
      )}

      {authCtx.userLoggedIn && authCtx.userIsAdmin && (
        <Route path="/admin">
          <div>
            <div
              style={{
                display: "table",
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
                width: "100%",
              }}
            >
              <Admin />
            </div>
          </div>
        </Route>
      )}

      <Route path="*">
        {!authCtx.userLoggedIn && <Redirect to="/login" />}
        {authCtx.userLoggedIn && !authCtx.userIsAdmin && (
          <Redirect to="/slot-board" />
        )}
        {authCtx.userLoggedIn && authCtx.userIsAdmin && (
          <Redirect to="/admin" />
        )}
      </Route>
    </Switch>
  );
}

export default App;
