import React from "react";
import logo from "../../assets/logo.png";
import "./Signup.scss";
import { withRouter } from "react-router-dom";
export default withRouter(function Signup({ history }) {
  const toLogin = () => {
    history.push("/login");
  };

  return (
    <div className="signup">
      <img src={logo} alt="" className="logo" />
      <div className="login-box">
        <p className="welcome">Create Your Account</p>

        <div className="inp mb20">
          <span className="label">Fullname</span>
          <input type="text" className="w100p bd-input" />
        </div>

        <div className="inp mb20">
          <span className="label">Username</span>
          <input type="text" className="w100p bd-input" />
        </div>

        <div className="inp mb20">
          <span className="label">Email Address</span>
          <input type="text" className="w100p bd-input" />
        </div>

        <div className="inp mb20">
          <span className="label">Password</span>
          <input type="text" className="w100p bd-input" />
        </div>

        <div className="inp mb20">
          <span className="label">Confirm Password</span>
          <input type="text" className="w100p bd-input" />
        </div>

        <div className="inp mb20">
          <span className="label">Select your country</span>
          <input type="text" className="w100p bd-input" />
        </div>

        <p className="forgot">
          Creating an account means you’re okay with our{" "}
          <span className="red">Terms of Service</span> and our{" "}
          <span className="red">default Notification Settings</span>
        </p>

        <button className="w100p main-btn mt12">REGISTER</button>

        <span className="caveat" onClick={toLogin}>
          Have an account? <span className="red pointer">Login</span>
        </span>
      </div>
    </div>
  );
});
