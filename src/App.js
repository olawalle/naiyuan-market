import React from "react";
import "./App.scss";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import SnackbarProvider from "react-simple-snackbar";
import AllPackages from "./pages/AllPackages/AllPackages";
import Profile from "./pages/Profile/Profile";
import Terms from "./pages/Profile/Terms";
import AppContextProvider from "./store/appContext";
import ForgotPassword from "./pages/Login/ForgotPassword";

function App() {
  return (
    <HashRouter>
      <SnackbarProvider>
        <div className="App">
          <AppContextProvider>
            <Switch match>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/forgot-password">
                <ForgotPassword />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/dashboard/">
                <Dashboard />
              </Route>
              <Route path="/all/">
                <AllPackages />
              </Route>
              <Route path="/profile/">
                <Profile />
              </Route>
              <Route path="/terms/">
                <Terms />
              </Route>
            </Switch>
          </AppContextProvider>
        </div>
      </SnackbarProvider>
    </HashRouter>
  );
}

export default App;
