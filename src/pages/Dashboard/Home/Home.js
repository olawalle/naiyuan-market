import React from "react";
import "./Home.scss";

import badge from "../../../assets/Image.svg";
import screen from "../../../assets/screen.png";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { appContext } from "../../../store/appContext";
import { useEffect } from "react";
import apiServices from "../../../services/apiServices";

export const Balance = () => {
  const context = useContext(appContext);
  const { user, rates, setTnx } = context;
  const [currency, setcurrency] = useState("₦");

  useEffect(() => {
    apiServices
      .getTnxs()
      .then((tnx) => {
        setTnx(tnx.data.transactions.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const returnBalance = () => {
    let yuanRate = rates.find((r) => r.pair === "Naira/Yuan");
    let yuanRate_ = yuanRate ? parseFloat(yuanRate.rate.split("/")[1]) : null;
    let yuanBalance = user.balance * yuanRate_;
    let val = currency === "₦" ? user.balance : yuanBalance;
    return val.toLocaleString();
  };

  return (
    <div className="balance mb12">
      <span className="title">
        Wallet Balance{" "}
        <select onChange={(e) => setcurrency(e.target.value)} name="" id="">
          <option value="₦">₦</option>
          <option value="¥">¥</option>
        </select>{" "}
      </span>
      <span className="amt">
        {currency} {returnBalance()}
      </span>
    </div>
  );
};

export default withRouter(function Home({ history }) {
  const context = useContext(appContext);
  const { orders, rates } = context;
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
              {rates &&
                rates.map((rate) => (
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
              {orders.map((row, i) => (
                <tr key={`row${i}`}>
                  <td>
                    <span className="no">{i + 1}</span>
                    Deskjet Printers
                    <img
                      src={row.picture_url}
                      height="20"
                      style={{
                        float: "right",
                        marginRight: "30px",
                        marginTop: "15px",
                      }}
                      alt=""
                    />
                  </td>
                  <td className="web">{row.quantity} Units</td>
                  <td>{row.reference}</td>
                  <td className="web">
                    <div
                      className={`dot ${
                        row.status === "pending"
                          ? "bg-yellow"
                          : row.status === "cancelled"
                          ? "bg-red"
                          : "bg-green"
                      }`}
                    ></div>{" "}
                    <span className="pr10">{row.status}</span>
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
