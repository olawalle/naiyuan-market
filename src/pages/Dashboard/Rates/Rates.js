import React, { useState } from "react";
import { useContext } from "react";
import "./rates.scss";
import { appContext } from "../../../store/appContext";
import Modal from "react-responsive-modal";
import Loader from "../../../components/loader/Loader";
import apiServices from "../../../services/apiServices";
import { useSnackbar } from "react-simple-snackbar";
import IsAdmin from "../../../components/isAdmin/IsAdmin";

export default function Rates() {
  const context = useContext(appContext);
  const { rates, setrates } = context;
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

  const getRates = () => {
    apiServices
      .getRates()
      .then((res) => {
        setrates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OpenModal = (i) => {
    setselectedPair(rates[i]);
    setopen(true);
    setisAdding(false);
  };

  const submit = () => {
    const { pair, rate } = selectedPair;
    let data = { pair, rate };
    if (!pair || !rate) {
      sethasError(true);
      return;
    }
    setloading(true);
    const request = isAdding
      ? apiServices.addRate(data)
      : apiServices.updateRate(data, selectedPair.id);

    request
      .then((res) => {
        console.log(res);
        openSnackbar("Request successful", 5000);
        setloading(false);
        setopen(false);
        getRates();
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

  return (
    <IsAdmin>
      <div className="rates">
        <Modal open={open} onClose={onCloseModal} center>
          <div
            className="gradient t-center o-hidden placement-modal"
            style={{ padding: 30 }}
          >
            <div className="header">{isAdding ? "Add" : "Update"} Rate</div>
            <div className="inp mb20">
              <span className="label">Pair</span>
              <input
                defaultValue={selectedPair.pair}
                type="text"
                className={`w100p bd-input ${
                  hasError && !selectedPair.pair && "has-error"
                }`}
                onChange={(e) =>
                  setselectedPair({ ...selectedPair, pair: e.target.value })
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
            <button className="main-btn" onClick={submit}>
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>
        </Modal>
        {rates.length < 3 && (
          <button
            className="main-btn"
            onClick={() => {
              setisAdding(true);
              setopen(true);
            }}
          >
            Add new
          </button>
        )}
        <div className="rates-wrap">
          <p style={{ fontSize: 14, textAlign: "left" }}>
            Please make sure the rates created are named <b>"Naira/Dollar"</b>,
            <b> "Naira/Yuan"</b> and <b>"Naira/Cedis"</b> as any other naming
            convention will affect the conversions.
          </p>
          {rates.map((rate, i) => (
            <div key={"rate" + i} className="rate gradient">
              <p>{rate.pair}</p>
              <p>{rate.rate}</p>
              <button onClick={() => OpenModal(i)} className="white-btn">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </IsAdmin>
  );
}
