import React from "react";
import "./App.scss";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch match>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
