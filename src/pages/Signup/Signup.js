import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./Signup.scss";
import { withRouter, useRouteMatch } from "react-router-dom";
import { countries } from "../../services/mocks";
import Loader from "../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";
import apiServices from "../../services/apiServices";

export default withRouter(function Signup({ history }) {
  let match = useRouteMatch();
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [hasError, sethasError] = useState(false);
  const [hasPasswordError, sethasPasswordError] = useState(false);
  const [hasPasswordError_, sethasPasswordError_] = useState(false);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [country, setcountry] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [country_code, setcountry_code] = useState("");
  const [password, setpassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [frontend_url, setfrontend_url] = useState("");
  const [loading, setloading] = useState(false);
  const [verifying, setverifying] = useState(false);
  const [signupDone, setsignupDone] = useState(false);

  const toLogin = () => {
    history.push("/login");
  };

  const updateForm = (key, value) => {
    switch (key) {
      case "fullname":
        let first_name = value.split(" ")[0];
        let last_name = value.split(" ")[1];
        setfirst_name(first_name);
        setlast_name(last_name);
        break;
      case "username":
        setusername(value);
        break;
      case "email":
        setemail(value);
        break;
      case "country":
        setcountry(value);
        // setcountry_code(countries.find((c) => c.name === value).code);
        break;
      case "country_code":
        setcountry_code(value);
        break;
      case "phone":
        setphone_number(value);
        break;
      case "password":
        setpassword(value);
        break;
      case "confirm_password":
        setpassword_confirmation(value);
        break;

      default:
        break;
    }
  };

  const submitForm = () => {
    let data = {
      first_name,
      last_name,
      username,
      email,
      country,
      phone_number,
      password,
      password_confirmation,
      frontend_url: `${window.location.origin}/#/signup?code=`,
    };
    if (
      !first_name ||
      !last_name ||
      !username ||
      !email ||
      !country ||
      !password ||
      !password_confirmation
    ) {
      sethasError(true);
      sethasPasswordError(false);
      return;
    }

    if (password !== password_confirmation) {
      sethasPasswordError_(true);
      return;
    }

    if (password.length < 8) {
      sethasPasswordError(true);
      return;
    }

    setloading(true);
    apiServices
      .signupUser(data)
      .then((res) => {
        setloading(false);
        openSnackbar("Account created successfully. Kindly login", 5000);
        setsignupDone(true);
      })
      .catch((err) => {
        console.log({ err });
        setloading(false);
        openSnackbar(
          err.response ? err.response.data.error.message : "An error occured",
          5000
        );
      });
  };

  useEffect(() => {
    let url = window.location;
    if (url.hash.includes("code")) {
      let code = url.hash.split("=")[1];
      apiServices
        .activateUser(code)
        .then((res) => {
          console.log(res);
          openSnackbar("Account activated", 5000);
          toLogin();
        })
        .catch((err) => {
          console.log(err);
          setverifying(false);
        });
    }
  }, []);

  return (
    <div className="signup">
      <img src={logo} alt="" className="logo" />
      {verifying ? (
        <p style={{ paddingTop: 100 }}>Verifying account...</p>
      ) : !signupDone ? (
        <div className="login-box">
          <p className="welcome">Create Your Account</p>

          <div className="inp mb20">
            <span className="label">Full name</span>
            <input
              onChange={(e) => updateForm("fullname", e.target.value)}
              type="text"
              className={`w100p bd-input ${
                hasError && (!first_name || !last_name) && "has-error"
              }`}
            />
          </div>

          <div className="inp mb20">
            <span className="label">Username</span>
            <input
              onChange={(e) => updateForm("username", e.target.value)}
              type="text"
              className={`w100p bd-input ${
                hasError && !username && "has-error"
              }`}
            />
          </div>

          <div className="inp mb20">
            <span className="label">Email Address</span>
            <input
              type="text"
              onChange={(e) => updateForm("email", e.target.value)}
              className={`w100p bd-input ${hasError && !email && "has-error"}`}
            />
          </div>

          <div className="inp mb20">
            <span className="label">Password</span>
            <input
              type="password"
              onChange={(e) => updateForm("password", e.target.value)}
              className={`w100p bd-input ${
                (hasError && !password) || hasPasswordError || hasPasswordError_
                  ? "has-error"
                  : ""
              }`}
            />
            {hasPasswordError &&
            (password.length > 0 || password.length < 8) ? (
              <span className="red" style={{ fontSize: 10 }}>
                Password must contain at least 8 characters
              </span>
            ) : null}
            {hasPasswordError_ && password !== password_confirmation ? (
              <span className="red" style={{ fontSize: 10 }}>
                Passwords do not match
              </span>
            ) : null}
          </div>

          <div className="inp mb20">
            <span className="label">Confirm Password</span>
            <input
              type="password"
              onChange={(e) => updateForm("confirm_password", e.target.value)}
              className={`w100p bd-input ${
                (hasError && !password_confirmation) ||
                hasPasswordError ||
                hasPasswordError_
                  ? "has-error"
                  : ""
              }`}
            />
          </div>

          <div className="inp mb20">
            <span className="label">Select your country</span>
            <select
              onChange={(e) => updateForm("country", e.target.value)}
              type="text"
              className={`w100p bd-input ${
                hasError && !country && "has-error"
              }`}
            >
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <p className="forgot">
            Creating an account means you’re okay with our{" "}
            <span className="red">Terms of Service</span> and our{" "}
            <span className="red">default Notification Settings</span>
          </p>

          <button className="w100p main-btn mt12" onClick={submitForm}>
            {loading ? <Loader /> : "REGISTER"}
          </button>

          <span className="caveat" onClick={toLogin}>
            Have an account? <span className="red pointer">Login</span>
          </span>
        </div>
      ) : (
        <div
          className="login-box"
          style={{ color: "#2D2F39", fontSize: 14, lineHeight: "24px" }}
        >
          <p>
            We have sent an email to <b>{email}</b> with a link to activate your
            account.
          </p>
          <p>
            If you do not received a mail after a few minutes, please check your
            spam folder.
          </p>

          <button className="w100p main-btn mt12" onClick={toLogin}>
            Back to login
          </button>
        </div>
      )}
    </div>
  );
});
