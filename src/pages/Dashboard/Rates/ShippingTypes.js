import React, { useState, useEffect } from "react";
import { useContext } from "react";
import "./rates.scss";
import { appContext } from "../../../store/appContext";
import Modal from "react-responsive-modal";
import Loader from "../../../components/loader/Loader";
import apiServices from "../../../services/apiServices";
import { useSnackbar } from "react-simple-snackbar";

export default function ShippingTypes() {
  //   const context = useContext(appContext);
  //   const { shippingTypes, setshippingTypes } = context;
  const [shippingTypes, setshippingTypes] = useState([]);
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [isAdding, setisAdding] = useState(false);
  const [selectedPair, setselectedPair] = useState({});
  const [hasError, sethasError] = useState(false);
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  const onCloseModal = () => {
    setopen(false);
  };

  const getshippingTypes = () => {
    apiServices
      .getShippingTypes()
      .then((res) => {
        console.log(res);
        setshippingTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OpenModal = (i) => {
    setselectedPair(shippingTypes[i]);
    setopen(true);
    setisAdding(false);
  };

  const submit = () => {
    const { name, rate, duration } = selectedPair;
    let data = { name, rate, duration };
    if (!name || !duration || !rate) {
      sethasError(true);
      return;
    }
    setloading(true);
    const request = isAdding
      ? apiServices.addShippingType(data)
      : apiServices.updateShippingType(data, selectedPair.id);

    request
      .then((res) => {
        console.log(res);
        openSnackbar("Request successful", 5000);
        setloading(false);
        setopen(false);
        getshippingTypes();
      })
      .catch((err) => {
        console.log({ err });
        setloading(false);
        openSnackbar(
          err.response.data.error.message ||
            "An error occured. Please try again",
          5000
        );
      });
  };

  useEffect(() => {
    getshippingTypes();
  }, []);

  return (
    <div className="rates">
      <Modal open={open} onClose={onCloseModal} center>
        <div
          className="gradient t-center o-hidden placement-modal"
          style={{ padding: 30 }}
        >
          <div className="header">{isAdding ? "Add" : "Update"} Shipping</div>
          <div className="inp mb20">
            <span className="label">Name</span>
            <input
              defaultValue={selectedPair.name}
              type="text"
              className={`w100p bd-input ${
                hasError && !selectedPair.name && "has-error"
              }`}
              onChange={(e) =>
                setselectedPair({ ...selectedPair, name: e.target.value })
              }
            />
          </div>
          <div className="inp mb20">
            <span className="label">Rate</span>
            <input
              defaultValue={selectedPair.rate}
              type="text"
              className={`w100p bd-input ${
                hasError && !selectedPair.rate && "has-error"
              }`}
              onChange={(e) =>
                setselectedPair({ ...selectedPair, rate: e.target.value })
              }
            />
          </div>
          <div className="inp mb20">
            <span className="label">Duration</span>
            <input
              defaultValue={selectedPair.duration}
              type="text"
              className={`w100p bd-input ${
                hasError && !selectedPair.duration && "has-error"
              }`}
              onChange={(e) =>
                setselectedPair({ ...selectedPair, duration: e.target.value })
              }
            />
          </div>
          <button className="main-btn" onClick={submit}>
            {loading ? <Loader /> : "Submit"}
          </button>
        </div>
      </Modal>
      <button
        className="main-btn"
        onClick={() => {
          setisAdding(true);
          setopen(true);
        }}
      >
        Add new
      </button>
      <div className="rates-wrap">
        {shippingTypes.map((rate, i) => (
          <div key={"rate" + i} className="link gradient">
            <p style={{ fontSize: 20 }}>{rate.name}</p>
            <p>NGN {parseFloat(rate.rate).toLocaleString()}</p>
            <p>{rate.duration}</p>
            <button onClick={() => OpenModal(i)} className="white-btn">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
