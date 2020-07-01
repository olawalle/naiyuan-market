import React from "react";
import "./Nav.scss";

import notif from "../../assets/notification.svg";

export default function Nav() {
  return (
    <div className="nav">
      <div className="icns">
        <div className="notif">
          <img src={notif} alt="" />
          <span>12</span>
        </div>
        <div className="user">
          <img src="https://randomuser.me/api/portraits/women/34.jpg" alt="" />
        </div>
        <span className="name">Mr Mike Eric</span>
      </div>
    </div>
  );
}
