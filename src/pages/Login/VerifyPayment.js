import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import apiServices from "../../services/apiServices";
import Loader from "../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";
import { appContext } from "../../store/appContext";
import axios from "axios";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

export default withRouter(function VerifyPayment({ history }) {
  const context = useContext(appContext);
  const { user, updateUser, setTnx } = context;
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  useEffect(() => {
    let ref = window.location.hash.split("=")[1];
    verifyPayment(ref);
  }, []);

  const verifyPayment = (reference) => {
    apiServices
      .verifyAcctFunding({ reference })
      .then((res) => {
        console.log(res);
        getCurrentUser();
        openSnackbar(res.data.message, 5000);
        history.push("/dashboard/my-wallet");
      })
      .catch((err) => {
        console.log(err);
        openSnackbar(
          err.response.data.error.message || "An error occured",
          5000
        );
      });
  };

  const getCurrentUser = () => {
    apiServices
      .getCurrentUser()
      .then((res) => {
        console.log(res);
        updateUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login ">
      <div className="login-box" style={{ textAlign: "center" }}>
        <p className="welcome">Verifying Payment</p>
        <button className="w100p main-btn mt12">
          <Loader />
        </button>
      </div>
    </div>
  );
});
