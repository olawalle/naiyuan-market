import React, { useState, useContext } from "react";
import "./Nav.scss";

import notif from "../../assets/notification.svg";

import edit from "../../assets/user.svg";
import logout from "../../assets/layer1.svg";
import cart from "../../assets/cart.svg";
import caret from "../../assets/caret.svg";
import logo from "../../assets/Logo.svg";
import { withRouter } from "react-router-dom";
import { NavLinks } from "../Sidebar/Sidebar";
import Avatar from "../Avatar/Avatar";
import { appContext } from "../../store/appContext";
import { Modal } from "react-responsive-modal";
import { mainUrl } from "../../services/urls";

export default withRouter(function Nav({ showLogo, history }) {
  const context = useContext(appContext);
  const { user, notifications, userCart } = context;
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

  const toCart = () => history.push("/dashboard/order-placement");

  return (
    <div className="nav">
      {showLogo && <img src={logo} alt="" className="logo web" />}

      <div className="icns">
        <div className="notif pointer" onClick={() => setopenNotif(true)}>
          <img src={notif} alt="" />
          {notifications.length ? <span>{notifications.length}</span> : null}
        </div>

        <div className="notif pointer" onClick={() => toCart()}>
          <img src={cart} alt="" />
          {userCart.length ? <span>{userCart.length}</span> : null}
        </div>

        <div className="web dropdown-wrap">
          <div
            className="avatar"
            style={{
              backgroundSize: "cover",
              backgroundImage:
                user.picture && user.picture.path
                  ? `url(${mainUrl}/image/${user.picture.path})`
                  : "",
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
      <div
        id="nav-icon1"
        onClick={() => setshow_nav(!show_nav)}
        className={show_nav ? "open" : ""}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="activelink web">{name}</div>
      <div className="activelink mobile">
        <img src={logo} alt="" className="logo" />
      </div>

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
            {notifications.map((notif, i) => (
              <li key={`notif${i}`}>
                <p className="heading_">{notif.title}</p>
                <p className="texts">{notif.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
});
