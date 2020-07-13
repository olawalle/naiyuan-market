import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./Signup.scss";
import { withRouter } from "react-router-dom";
import { countries } from "../../services/mocks";
import Loader from "../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";
import apiServices from "../../services/apiServices";

export default withRouter(function Signup({ history }) {
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [hasError, sethasError] = useState(false);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [country, setcountry] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [country_code, setcountry_code] = useState("");
  const [password, setpassword] = useState("");
  const [password_confirm, setpassword_confirm] = useState("");
  const [frontend_url, setfrontend_url] = useState("");
  const [loading, setloading] = useState(false);

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
        setpassword_confirm(value);
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
      country_code,
      password,
      password_confirm,
    };
    console.log(data);
    if (
      !first_name ||
      !last_name ||
      !username ||
      !email ||
      !country ||
      !password ||
      !password_confirm
    ) {
      sethasError(true);
      return;
    }
    setloading(true);
    apiServices
      .signupUser(data)
      .then((res) => {
        console.log(res);
        setloading(false);
      })
      .catch((err) => {
        console.log({ err });
        setloading(false);
        openSnackbar("An error occured", 5000);
      });
  };

  return (
    <div className="signup">
      <img src={logo} alt="" className="logo" />
      <div className="login-box">
        <p className="welcome">Create Your Account</p>

        <div className="inp mb20">
          <span className="label">Fullname</span>
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
            className={`w100p bd-input ${hasError && !username && "has-error"}`}
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
            type="text"
            onChange={(e) => updateForm("password", e.target.value)}
            className={`w100p bd-input ${hasError && !password && "has-error"}`}
          />
        </div>

        <div className="inp mb20">
          <span className="label">Confirm Password</span>
          <input
            type="text"
            onChange={(e) => updateForm("confirm_password", e.target.value)}
            className={`w100p bd-input ${
              hasError && !password_confirm && "has-error"
            }`}
          />
        </div>

        <div className="inp mb20">
          <span className="label">Select your country</span>
          <select
            onChange={(e) => updateForm("country", e.target.value)}
            type="text"
            className={`w100p bd-input ${hasError && !country && "has-error"}`}
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
    </div>
  );
});
