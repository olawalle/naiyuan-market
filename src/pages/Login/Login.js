import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import apiServices from "../../services/apiServices";
import Loader from "../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";
import { appContext } from "../../store/appContext";
import axios from "axios";

export default withRouter(function Login({ history }) {
  const context = useContext(appContext);
  const { user, updateUser, setTnx } = context;
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

  const toForgot = () => {
    history.push("/forgot-password");
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
    if (!email || !password) {
      sethasError(true);
      return;
    }
    setloading(true);

    apiServices
      .userLogin(data)
      .then((res) => {
        updateUser(res.data.user);
        sessionStorage.setItem("naiyuan_token", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        setTimeout(() => {
          setloading(false);
          history.push("/dashboard");
          apiServices
            .getProcurements()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });

          apiServices
            .getTnxs()
            .then((tnx) => {
              console.log({ tnx });
              setTnx(tnx.data.transactions.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }, 500);
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
            defaultValue={email}
            type="text"
            className={`w100p bd-input ${hasError && !email && "has-error"}`}
            onChange={(e) => updateForm("email", e.target.value)}
          />
        </div>

        <div className="inp mb20">
          <span className="label">Password</span>
          <input
            defaultValue={password}
            onChange={(e) => updateForm("password", e.target.value)}
            type="password"
            className={`w100p bd-input ${hasError && !password && "has-error"}`}
          />
        </div>

        <div className="forgot red f-right pointer" onClick={toForgot}>
          Forgot password?
        </div>

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
