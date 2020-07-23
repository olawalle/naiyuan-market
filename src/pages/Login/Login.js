import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import apiServices from "../../services/apiServices";
import Loader from "../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";
import { appContext } from "../../store/appContext";

export default withRouter(function Login({ history }) {
  const context = useContext(appContext);
  const { user, updateUser } = context;
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [email, setEmail] = useState("superadmin@naiyuan.com");
  const [password, setPassword] = useState("default12345");
  const [hasError, sethasError] = useState(false);
  const [loading, setloading] = useState(false);

  const toSignup = () => {
    history.push("/signup");
  };

  const updateForm = (key, value) => {
    switch (key) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const login = () => {
    let data = {
      email,
      password,
    };
    console.log(data);
    if (!email || !password) {
      sethasError(true);
      return;
    }

    apiServices
      .userLogin(data)
      .then((res) => {
        console.log(res);
        updateUser(res.data.user);
        sessionStorage.setItem("naiyuan_token", res.data.token);
        setloading(false);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log({ err });
        setloading(false);
        openSnackbar("An error occured", 5000);
      });
  };

  return (
    <div className="login">
      <img src={logo} alt="" className="logo" />
      <div className="login-box">
        <p className="welcome">Welcome Back! Login</p>

        <div className="inp mb20">
          <span className="label">Email</span>
          <input
            onChange={(e) => updateForm("email", e.target.value)}
            type="text"
            className={`w100p bd-input ${hasError && !email && "has-error"}`}
          />
        </div>

        <div className="inp mb20">
          <span className="label">Password</span>
          <input
            onChange={(e) => updateForm("password", e.target.value)}
            type="password"
            className={`w100p bd-input ${hasError && !password && "has-error"}`}
          />
        </div>

        <div className="forgot red f-right">Forgot password?</div>

        <button className="w100p main-btn mt12" onClick={login}>
          {!loading ? <span>LOG IN</span> : <Loader />}
        </button>

        <span className="caveat" onClick={toSignup}>
          Don’t have an account?{" "}
          <span className="red pointer">Create an Account</span>
        </span>
      </div>
    </div>
  );
});
