import React, { useState } from "react";
import "./Tracking.scss";
import apiServices from "../../../services/apiServices";
import Loader from "../../../components/loader/Loader";

export default function Tracking() {
  const [trackingID, settrackingID] = useState("");
  const [statuses, setstatuses] = useState([]);
  const [tracking_number, settracking_number] = useState("");
  const [shipping, setshipping] = useState("");
  const [step, setstep] = useState(0);
  const [loading, setloading] = useState(false);
  const [hasError, sethasError] = useState(false);

  const trackOrder = () => {
    if (!trackingID) {
      sethasError(true);
      return;
    }
    sethasError(false);
    setloading(true);
    apiServices
      .trackShipping(trackingID)
      .then((res) => {
        console.log(res);
        let status = res.data.status;
        setstatuses(status);
        setshipping(res.data.shipping.name);
        settracking_number(res.data.tracking_number);
        let mostRecent = status[status.length - 1];
        let step =
          mostRecent.title === "Ordered"
            ? 1
            : mostRecent.title === "Ready"
            ? 2
            : mostRecent.title === "Shipped"
            ? 3
            : 5;
        setstep(step);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  return (
    <div className="tracking">
      <div className="header">Tracking</div>

      <div className="gradient w100p mt30">
        <div className="roww">
          <div className="label">Tracking Number</div>
          <div className="inp">
            <input
              onChange={(e) => settrackingID(e.target.value)}
              type="text"
              className={`border-inp w100p ${
                hasError && !trackingID ? "has-error" : ""
              }`}
            />
          </div>
        </div>
        <div className="roww t-right">
          <button onClick={trackOrder} className="main-btn mt12">
            {loading ? <Loader /> : "Track Order"}
          </button>
        </div>
      </div>

      {statuses.length ? (
        <div className="box">
          <p className="title">Shipping Status</p>
          <div className="indicator">
            <div
              className="inner"
              style={{ width: `${step < 5 ? step * 10 : step * 20}%` }}
            ></div>
          </div>
          <div className="titles">
            <div className="one">
              <b>Ordered</b>
              <span>12/10/2020</span>
              <span>12:00</span>
            </div>
            <div className="one">
              <b>Ready</b>
              <span>12/10/2020</span>
              <span>12:00</span>
            </div>
            <div className="one">
              <b>Shipped</b>
              <span>12/10/2020</span>
              <span>12:00</span>
            </div>
            <div className="two">
              <b>Estimated</b>
              <b>Delivery</b>
              <span>12:00</span>
            </div>
          </div>
          <br /> <br />
          <p className="title mt30 font-size-18">Updates:</p>
          <div className="orders">
            <div className="row head">
              <div className="three">Ordered</div>
              <div className="three">Location</div>
              <div className="three event">Event</div>
            </div>
            {statuses.map((item) => (
              <div className="row items">
                <div className="three">{item.date}</div>
                <div className="three">{item.location}</div>
                <div className="three event">
                  <span className="black">{item.title}</span>
                  <span className="grey">Carrier: {shipping}</span>
                  <span className="grey">Tracking No: {tracking_number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
