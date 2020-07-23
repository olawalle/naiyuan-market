import React, { useState, useContext } from "react";
import "./Nav.scss";

import notif from "../../assets/notification.svg";

import edit from "../../assets/user.svg";
import logout from "../../assets/layer1.svg";
import caret from "../../assets/caret.svg";
import logo from "../../assets/Logo.svg";
import { withRouter } from "react-router-dom";
import { NavLinks } from "../Sidebar/Sidebar";
import Avatar from "../Avatar/Avatar";
import { appContext } from "../../store/appContext";

export default withRouter(function Nav({ showLogo, history }) {
  const context = useContext(appContext);
  const { user } = context;
  const [open, setopen] = useState(false);
  const [show_nav, setshow_nav] = useState(false);
  const [name, setName] = useState("Dashbaord");

  const toProfile = () => {
    history.push("/profile");
  };

  return (
    <div className="nav">
      {showLogo && <img src={logo} alt="" className="logo web" />}

      <div
        id="nav-icon1"
        onClick={() => setshow_nav(!show_nav)}
        className={show_nav ? "open" : ""}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="activelink">{name}</div>

      <div className={`mobile-nav ${show_nav ? "open" : ""} `}>
        <Avatar />
        <div style={{ marginTop: "-60px" }}>
          <NavLinks
            closeNav={() => setshow_nav(false)}
            sideOpen={true}
            history={history}
            setName={setName}
          />
        </div>
      </div>

      <div className="icns">
        <div className="notif">
          <img src={notif} alt="" />
          <span>12</span>
        </div>

        <div className="web dropdown-wrap">
          <div
            className="avatar"
            style={{
              backgroundImage: `url("https://randomuser.me/api/portraits/women/34.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span className="name">{user.full_name}</span>
          <img
            src={caret}
            style={{
              width: 10,
              marginLeft: 12,
              transform: open ? `rotate(180deg)` : "",
            }}
            alt=""
          />
          <div className="dropdown">
            <ul>
              <li className="bb" onClick={toProfile}>
                Edit profile <img src={edit} className="f-right m15" alt="" />{" "}
              </li>
              <li>
                Logout <img src={logout} className="f-right m15" alt="" />{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});
