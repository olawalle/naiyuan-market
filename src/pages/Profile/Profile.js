import React, { useContext, useEffect, useState } from "react";
import "./Profile.scss";
import { withRouter } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Avatar from "../../components/Avatar/Avatar";
import { appContext } from "../../store/appContext";
import { AddAddress } from "../../components/ShippingModal/ShippingModal";
import Modal from "react-responsive-modal";
import apiServices from "../../services/apiServices";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../components/loader/Loader";

export default withRouter(function Profile({ history }) {
  const context = useContext(appContext);
  const { user, addresses, updateUser } = context;
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  const [updatedData, setupdatedData] = useState({});
  const [loadingReset, setloadingReset] = useState(false);
  const [open, setopen] = useState(false);
  const [user_, setuser_] = useState({});
  const [formChanged, setformChanged] = useState(false);
  const [passwords, setpasswords] = useState({
    old_password: "",
    password: "",
  });

  useEffect(() => {
    setuser_(user);
  }, []);

  const submitForm = () => {
    if (passwords.old_password && passwords.password) {
      changePassword();
      setloadingReset(true);
    }
    if (formChanged) {
      setloadingReset(true);
      updateUserData();
    }
  };

  const updateForm = (key, value) => {
    let data = {
      ...user_,
    };
    data[key] = value;
    console.log({ key, value });
    setuser_(data);
    setformChanged(true);
  };

  const toDash = () => {
    history.push("/dashboard/");
  };

  const toTerms = () => {
    history.push("/terms/");
  };

  const changePassword = () => {
    let data = {
      ...passwords,
      password_confirmation: passwords.password,
    };
    apiServices
      .changePassword(data)
      .then((res) => {
        console.log(res);
        setloadingReset(false);
        openSnackbar("Password updated successfully", 5000);
      })
      .catch((err) => {
        console.log({ err });
        setloadingReset(false);
        openSnackbar(err.response.data.error.message, 5000);
      });
  };

  const updateUserData = () => {
    let data = {
      first_name: user_.first_name,
      last_name: user_.last_name,
      phone: user_.phone,
      address: user_.address,
      country: user_.country,
    };
    apiServices
      .updateUser(data)
      .then((res) => {
        openSnackbar("User details updated");
        setloadingReset(false);
        apiServices
          .getCurrentUser()
          .then((res) => {
            updateUser(res.data);
          })
          .catch((err) => {
            console.log({ err });
          });
      })
      .catch((err) => {
        console.log(err);
        setloadingReset(false);
        openSnackbar(
          err.response.data.error.message ||
            "An error occured, Please try again",
          5000
        );
      });
  };

  const onCloseModal = () => setopen(false);

  return (
    <div className="profile">
      <Modal open={open} onClose={onCloseModal} center>
        <AddAddress showBack={false} setAddinNew={null} setopen={setopen} />
      </Modal>
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
        <div className="narrow t-center mobile mb30">
          <Avatar small={true} />

          <div className="addresses">
            <div className="add-wrap">
              {addresses.map((address, i) => (
                <>
                  <div className="name">
                    Mr {address.first_name} {address.last_name}
                  </div>
                  <div className="address">
                    <b>Address {i + 1}:</b> {address.address}, {address.country}
                  </div>
                  <div className="address" style={{ marginTop: "-8px" }}>
                    <b>Phone:</b>
                    <span className="block">
                      {address.mobile_number || "---"}
                    </span>
                  </div>
                </>
              ))}
            </div>
            <button onClick={() => setopen(true)} className="main-btn">
              Add Address
            </button>{" "}
            <br />
            <button onClick={toTerms} className="main-btn mt12">
              Term of Service
            </button>
          </div>
        </div>
        <div className="wide">
          <div className="heading">Edit Personal Information</div>

          <div className="inp mb20 f-left">
            <span className="label">First name</span>
            <input
              defaultValue={user_.first_name}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("full_name", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Last name</span>
            <input
              defaultValue={user_.last_name}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("username", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-left">
            <span className="label">Phone No.</span>
            <input
              defaultValue={user_.phone}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("phone", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Email Address</span>
            <input
              defaultValue={user_.email}
              type="text"
              readOnly
              className="w100p bd-input"
              onChange={(e) => updateForm("email", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-left">
            <span className="label">Address</span>
            <input
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("address", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Country</span>
            <input
              defaultValue={user_.country}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("country", e.target.value)}
            />
          </div>
          <div className="reset">
            <p>Reset Password</p>

            <div className="inp forgot mb20 f-left">
              <span className="label">Old Password</span>
              <input
                type="password"
                onChange={(e) =>
                  setpasswords({
                    ...passwords,
                    old_password: e.target.value,
                  })
                }
                className="w100p bd-input"
              />
            </div>

            <div className="inp forgot mb20 f-right">
              <span className="label">New Password</span>
              <input
                type="password"
                onChange={(e) =>
                  setpasswords({
                    ...passwords,
                    password: e.target.value,
                  })
                }
                className="w100p bd-input"
              />
            </div>
          </div>

          <button className="main-btn mt40" onClick={submitForm}>
            {loadingReset ? <Loader /> : "Submit"}
          </button>
        </div>

        <div className="narrow t-center web">
          <Avatar small={true} />

          <div className="addresses">
            <div className="add-wrap">
              {addresses.map((address, i) => (
                <>
                  <div className="name">
                    Mr {address.first_name} {address.last_name}
                  </div>
                  <div className="address">
                    <b>Address {i + 1}:</b> {address.address}, {address.country}
                  </div>
                  <div className="address" style={{ marginTop: "-8px" }}>
                    <b>Phone:</b>
                    <span className="block">
                      {address.mobile_number || "---"}
                    </span>
                  </div>
                </>
              ))}
            </div>
            <button onClick={() => setopen(true)} className="main-btn">
              Add Address
            </button>{" "}
            <br />
            <button onClick={toTerms} className="main-btn mt12">
              Term of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
