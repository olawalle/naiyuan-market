import React from "react";
import "./Home.scss";

import badge from "../../../assets/Image.svg";
import screen from "../../../assets/screen.png";
import { withRouter } from "react-router-dom";
import { useState } from "react";

const Balance = () => {
  const [currency, setcurrency] = useState("₦");
  return (
    <div className="balance mb12">
      <span className="title">
        Wallet Balance{" "}
        <select onChange={(e) => setcurrency(e.target.value)} name="" id="">
          <option value="₦">₦</option>
          <option value="¥">¥</option>
        </select>{" "}
      </span>
      <span className="amt">{currency}20,000</span>
    </div>
  );
};

export default withRouter(function Home({ history, rates }) {
  const toAll = () => {
    history.push("/all");
  };

  const toProfile = () => {
    history.push("/profile");
  };

  return (
    <div className="home">
      <div className="wide">
        <div className="w100p mobile mb30">
          <Balance />
        </div>
        <div className="top-section">
          <div className="half gradient f-left">
            <div className="heading">
              <p>
                Hello Mr Mike Erik
                <span className="f-right red pointer" onClick={toProfile}>
                  View Profile
                </span>
              </p>
            </div>
            <div className="btm">
              <div className="half">
                <p>
                  <b>Address:</b> ad eveniet hic quibusdam iusto incidunt eniet
                  hic quibusdam iusto incidunt
                </p>
                <span className="copy">copy</span>
              </div>
              <div className="half">
                <p>
                  <b>防飛間:</b> 防飛間応支違索加売偽顔動思首跡初発止見使
                </p>
                <span className="copy">copy</span>
              </div>
            </div>
          </div>
          <div className="half gradient f-right">
            <div className="heading">
              <p>Todays Exchange Rate</p>
            </div>
            <div className="btm">
              {rates.map((rate) => (
                <div key={rate.pair} className="thirds">
                  <p className="red">{rate.pair}</p>
                  <span>{rate.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="btm-section">
          <p className="title">My Packages</p>
          <table className="main-table">
            <thead>
              <tr>
                <th>Item</th>
                <th className="web">Qty</th>
                <th>Tracking ID</th>
                <th className="web">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((row, i) => (
                <tr key={`row${i}`}>
                  <td>
                    <span className="no">{i + 1}</span>
                    Deskjet Printers
                    <img
                      src={screen}
                      height="20"
                      style={{
                        float: "right",
                        marginRight: "30px",
                        marginTop: "15px",
                      }}
                      alt=""
                    />
                  </td>
                  <td className="web">3 Units</td>
                  <td>IU2387GGJ08U</td>
                  <td className="web">
                    <div
                      className={`dot ${
                        !(i % 2)
                          ? "bg-yellow"
                          : !(i % 3)
                          ? "bg-red"
                          : "bg-green"
                      }`}
                    ></div>
                    Shipped
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">
                  <p onClick={toAll} className="red t-center pointer">
                    View All Packages
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="narrow">
        <div className="w100p web">
          <Balance />
        </div>
        <img className="badge web" src={badge} alt="" />
      </div>
    </div>
  );
});
