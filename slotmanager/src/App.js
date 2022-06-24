import "./App.css";

import { Switch, Route } from "react-router-dom";

import { Container } from "react-bootstrap";

import SlotManager from "./Components/Pages/SlotManager/SlotManager";
import Login from "./Components/Pages/Login/Login";

function App() {
  return (
    <Switch>
      <Route path="/login">
          <div className="App">
            <Container
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
            </Container>
          </div>
        </Route>

      <Route path="/slot-board">
          <div className="App">
            <Container
              style={{ padding: "0rem 10rem 0rem 10rem", minHeight: "100%" }}
            >
              <SlotManager />
            </Container>
          </div>
      </Route>
    </Switch>
  );
}

export default App;
