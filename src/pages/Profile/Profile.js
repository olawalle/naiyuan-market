import React, { useContext, useEffect, useState } from "react";
import "./Profile.scss";
import { withRouter } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Avatar from "../../components/Avatar/Avatar";
import { appContext } from "../../store/appContext";
import { AddAddress } from "../../components/ShippingModal/ShippingModal";
import Modal from "react-responsive-modal";

export default withRouter(function Profile({ history }) {
  const context = useContext(appContext);
  const { user, addresses } = context;

  const [updatedData, setupdatedData] = useState({});
  const [open, setopen] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const updateForm = (key, value) => {
    let data = {
      ...updatedData,
    };
    data[key] = value;
    setupdatedData(data);
  };

  const toDash = () => {
    history.push("/dashboard/");
  };

  const toTerms = () => {
    history.push("/terms/");
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
        <div className="wide">
          <div className="heading">Edit Personal Information</div>

          <div className="inp mb20 f-left">
            <span className="label">Full name</span>
            <input
              defaultValue={user.full_name}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("full_name", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Usename</span>
            <input
              defaultValue={user.username}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("username", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-left">
            <span className="label">Phone No.</span>
            <input
              defaultValue={user.phone}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("phone", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Email Address</span>
            <input
              defaultValue={user.email}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("email", e.target.value)}
            />
          </div>

          <div className="inp mb20 f-left">
            <span className="label">Address</span>
            <input type="text" className="w100p bd-input" />
          </div>

          <div className="inp mb20 f-right">
            <span className="label">Country</span>
            <input
              defaultValue={user.country}
              type="text"
              className="w100p bd-input"
              onChange={(e) => updateForm("country", e.target.value)}
            />
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

          <div className="name">Mr {user.full_name}</div>
          <div className="addresses">
            {addresses.map((address, i) => (
              <div className="address">
                <b>Address {i + 1}:</b> {address.address}, {address.country}
              </div>
            ))}
            <div className="address">
              <b>Phone:</b> <br />
              {user.phone || user.phone_number || "---"}
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
