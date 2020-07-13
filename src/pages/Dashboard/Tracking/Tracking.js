import React from "react";
import "./Tracking.scss";

export default function Tracking() {
  return (
    <div className="tracking">
      <div className="header">Tracking</div>

      <div className="gradient w100p mt30">
        <div className="roww">
          <div className="label">Tracking Number</div>
          <div className="inp">
            <input type="text" className="border-inp w100p" />
          </div>
        </div>
        <div className="roww t-right">
          <button className="main-btn mt12">Track Order</button>
        </div>
      </div>

      <div className="box">
        <p className="title">Shipping Status</p>
        <div className="indicator">
          <div className="inner"></div>
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
          <div className="row items">
            <div className="three">12/05/2020</div>
            <div className="three">India</div>
            <div className="three event">
              <span className="black">Shipped</span>
              <span className="grey">Carrier: TNT</span>
              <span className="grey">Tracking No: 3243GUYC6H</span>
            </div>
          </div>
          <div className="row items">
            <div className="three">12/05/2020</div>
            <div className="three">India</div>
            <div className="three event">
              <span className="black">Shipped</span>
              <span className="grey">Carrier: TNT</span>
              <span className="grey">Tracking No: 3243GUYC6H</span>
            </div>
          </div>
          <div className="row items">
            <div className="three">12/05/2020</div>
            <div className="three">India</div>
            <div className="three event">
              <span className="black">Shipped</span>
              <span className="grey">Carrier: TNT</span>
              <span className="grey">Tracking No: 3243GUYC6H</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
