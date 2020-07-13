import React, { useState } from "react";
import "./Nav.scss";

import notif from "../../assets/notification.svg";

import edit from "../../assets/user.svg";
import logout from "../../assets/layer1.svg";
import caret from "../../assets/caret.svg";

export default function Nav() {
  const [open, setopen] = useState(false);
  return (
    <div className="nav">
      <div className="icns">
        <div className="notif">
          <img src={notif} alt="" />
          <span>12</span>
        </div>

        <div className="dropdown-wrap">
          <div
            className="avatar"
            style={{
              backgroundImage: `url("https://randomuser.me/api/portraits/women/34.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span className="name">Mr Eric Cantona</span>
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
              <li className="bb">
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
}
