import React from "react";
import "./Profile.scss";
import { withRouter } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Avatar from "../../components/Avatar/Avatar";

export default withRouter(function Profile({ history }) {
  const toDash = () => {
    history.push("/dashboard/");
  };

  const toTerms = () => {
    history.push("/terms/");
  };
  return (
    <div className="profile">
      <Nav showLogo={true} />
      <div className="header">
        <div className="left t-left">
          <span onClick={toDash} className="light pointer">
            Dashboard
          </span>
          <span className="thick">Edit Profile</span>
        </div>
      </div>
      <div className="profile-content">
        <div className="wide">
          <div className="heading">Edit Personal Information</div>

          <div className="inp mb20 f-left">
            <span className="label">Full name</span>
            <input type="text" className="w100p bd-input" />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Usename</span>
            <input type="text" className="w100p bd-input" />
          </div>

          <div className="inp mb20 f-left">
            <span className="label">Phone No.</span>
            <input type="text" className="w100p bd-input" />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Email Address</span>
            <input type="text" className="w100p bd-input" />
          </div>

          <div className="inp mb20 f-left">
            <span className="label">Address</span>
            <input type="text" className="w100p bd-input" />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Country</span>
            <input type="text" className="w100p bd-input" />
          </div>
          <div className="reset">
            <p>Reset Password</p>

            <div className="inp forgot mb20 f-left">
              <span className="label">Old Password</span>
              <input type="text" className="w100p bd-input" />
            </div>

            <div className="inp forgot mb20 f-right">
              <span className="label">New Password</span>
              <input type="text" className="w100p bd-input" />
            </div>
          </div>

          <button className="main-btn mt40">Submit</button>
        </div>
        <div className="narrow t-center">
          <Avatar />

          <div className="name">Mr Eric Moore</div>
          <div className="addresses">
            <div className="address">
              <b>Address 1:</b> Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum.
            </div>
            <div className="address">
              <b>Address 2:</b> Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Rerum.
            </div>
            <div className="address">
              <b>Phone:</b> <br />
              08022332233
            </div>
            <button onClick={toTerms} className="main-btn">
              Term of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});