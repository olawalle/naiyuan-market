import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import apiServices from "../../services/apiServices";
import Loader from "../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";
import { appContext } from "../../store/appContext";

export default withRouter(function ForgotPaaword({ history }) {
  const context = useContext(appContext);
  const { user, updateUser } = context;
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [email, setEmail] = useState("");
  const [hasError, sethasError] = useState(false);
  const [loading, setloading] = useState(false);
  const [sent, setsent] = useState(false);

  const toSignup = () => {
    history.push("/signup");
  };

  const submit = () => {
    if (sent) {
      history.push("/login");
    }
    let data = {
      email,
      frontend_url: `${window.location.origin}/#/forgot-password?code=`,
    };
    if (!email) {
      sethasError(true);
      return;
    }
    setloading(true);
    apiServices
      .requestReset(data)
      .then((res) => {
        setloading(false);
        setsent(true);
      })
      .catch((err) => {
        console.log({ err });
        setloading(false);
      });
  };

  return (
    <div className="login">
      <img src={logo} alt="" className="logo" />
      <div className="login-box">
        <p className="welcome">Forgot Password</p>

        {!sent ? (
          <div className="inp mb20">
            <span className="label">Email</span>
            <input
              defaultValue={email}
              type="text"
              className={`w100p bd-input ${hasError && !email && "has-error"}`}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div style={{ color: "#2D2F39", fontSize: 14, lineHeight: "24px" }}>
            <p>
              We have sent an email to {email} with a link to reset your
              password.
            </p>
            <p>
              If you have not received a mail after a few minutes, please check
              your spam folder.
            </p>
          </div>
        )}

        <button className="w100p main-btn mt12" onClick={submit}>
          {!loading ? <span>CONTINUE</span> : <Loader />}
        </button>

        <span className="caveat" onClick={toSignup}>
          Don’t have an account?{" "}
          <span className="red pointer">Create an Account</span>
        </span>
      </div>
    </div>
  );
});
