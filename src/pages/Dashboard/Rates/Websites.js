import React, { useState } from "react";
import { useContext } from "react";
import "./rates.scss";
import { appContext } from "../../../store/appContext";
import Modal from "react-responsive-modal";
import Loader from "../../../components/loader/Loader";
import apiServices from "../../../services/apiServices";
import { useSnackbar } from "react-simple-snackbar";

export default function Websites() {
  const context = useContext(appContext);
  const { websites, setWebsites } = context;
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

  const getWebsites = () => {
    apiServices
      .getWebsites()
      .then((res) => {
        setWebsites(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OpenModal = (i) => {
    setselectedPair(websites[i]);
    setopen(true);
    setisAdding(false);
  };

  const submit = () => {
    const { name, link } = selectedPair;
    let data = { name, link };
    if (!name || !link) {
      sethasError(true);
      return;
    }
    setloading(true);
    const request = isAdding
      ? apiServices.addWebsite(data)
      : apiServices.updateWebsite(data, selectedPair.id);

    request
      .then((res) => {
        console.log(res);
        openSnackbar("Request successful", 5000);
        setloading(false);
        setopen(false);
        getWebsites();
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
    <div className="rates">
      <Modal open={open} onClose={onCloseModal} center>
        <div
          className="gradient t-center o-hidden placement-modal"
          style={{ padding: 30 }}
        >
          <div className="header">{isAdding ? "Add" : "Update"} Website</div>
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
            <span className="label">Link</span>
            <input
              defaultValue={selectedPair.link}
              type="text"
              className={`w100p bd-input ${
                hasError && !selectedPair.link && "has-error"
              }`}
              onChange={(e) =>
                setselectedPair({ ...selectedPair, link: e.target.value })
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
        {websites.map((rate, i) => (
          <div key={"rate" + i} className="link">
            <p>{rate.name}</p>
            <p>{rate.link}</p>
            <button onClick={() => OpenModal(i)} className="white-btn">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
