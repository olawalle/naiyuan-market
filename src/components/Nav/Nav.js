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
import { Modal } from "react-responsive-modal";

export default withRouter(function Nav({ showLogo, history }) {
  const context = useContext(appContext);
  const { user } = context;
  const [open, setopen] = useState(false);
  const [show_nav, setshow_nav] = useState(false);
  const [name, setName] = useState("Dashboard");
  const [openNotif, setopenNotif] = useState(false);

  const toProfile = () => {
    history.push("/profile");
  };

  const onCloseModal = () => {
    setopenNotif(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push("/login");
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
        <div className="main-content">
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
      </div>

      <Modal open={openNotif} onClose={onCloseModal} center>
        <div className="gradient t-center o-hidden notif-modal">
          <p className="heading t-center">Notifications</p>
          <ul>
            <li>
              <p className="heading_">Tracking number</p>
              <p className="texts">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                reiciendis possimus quisquam labore rerum porro eveniet
                eligendi, pariatur sit fugit accusantium eos, temporibus quod
                inventore a voluptatem odio magnam dolorum?
              </p>
            </li>
            <li>
              <p className="heading_">Tracking number</p>
              <p className="texts">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                reiciendis possimus quisquam labore rerum porro eveniet
                eligendi, pariatur sit fugit accusantium eos, temporibus quod
                inventore a voluptatem odio magnam dolorum?
              </p>
            </li>
            <li>
              <p className="heading_">Tracking number</p>
              <p className="texts">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                reiciendis possimus quisquam labore rerum porro eveniet
                eligendi, pariatur sit fugit accusantium eos, temporibus quod
                inventore a voluptatem odio magnam dolorum?
              </p>
            </li>
          </ul>
        </div>
      </Modal>

      <div className="icns">
        <div className="notif pointer" onClick={() => setopenNotif(true)}>
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
              <li onClick={handleLogout}>
                Logout <img src={logout} className="f-right m15" alt="" />{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});
