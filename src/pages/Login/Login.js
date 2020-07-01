import React from "react";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { withRouter } from "react-router-dom";

export default withRouter(function Login({ history }) {
  const toSignup = () => {
    history.push("/signup");
  };

  const login = () => {
    history.push("/dashboard");
  };

  return (
    <div className="login">
      <img src={logo} alt="" className="logo" />
      <div className="login-box">
        <p className="welcome">Welcome Back! Login</p>

        <div className="inp mb20">
          <span className="label">Email</span>
          <input type="text" className="w100p bd-input" />
        </div>

        <div className="inp mb20">
          <span className="label">Password</span>
          <input type="text" className="w100p bd-input" />
        </div>
        <div className="forgot red f-right">Forgot password?</div>

        <button className="w100p main-btn mt12" onClick={login}>
          LOG IN
        </button>

        <span className="caveat" onClick={toSignup}>
          Don’t have an account?{" "}
          <span className="red pointer">Create an Account</span>
        </span>
      </div>
    </div>
  );
});
