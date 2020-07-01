import React, { useState } from "react";
import "./Dashboard.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import back from "../../assets/back-arrow.svg";
import Home from "./Home/Home";
import { useRouteMatch, HashRouter, Switch, Route } from "react-router-dom";
import Nav from "../../components/Nav/Nav";

export default function Dashboard() {
  let match = useRouteMatch();
  const [sideOpen, setsideOpen] = useState(false);
  return (
    <div className="dashboard">
      <div className={`side-wrap ${sideOpen ? "open" : ""}`}>
        <Sidebar sideOpen={sideOpen} />
        <div className="arrow pointer" onClick={() => setsideOpen(!sideOpen)}>
          <img src={back} className={`${!sideOpen ? "rotate" : ""}`} alt="" />
        </div>
      </div>

      <HashRouter>
        <div className={`dash-contents ${!sideOpen ? "wide" : "narrow"}`}>
          <Nav />
          <Switch>
            <Route path={`${match.path}`}>
              <Home />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}
