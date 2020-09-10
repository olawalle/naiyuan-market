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
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "react-simple-snackbar";

export const Balance = () => {
  const context = useContext(appContext);
  const { user, rates, setTnx, addresses } = context;
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
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
    console.log({ user });
  }, []);

  const returnBalance = () => {
    let yuanRate = rates.find((r) => r.pair === "Naira/Yuan");
    let yuanRate_ = yuanRate ? parseFloat(yuanRate.rate.split("/")[0]) : null;
    let yuanBalance = user.balance / yuanRate_;
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
  const { orders, rates, addresses, user } = context;
  const toAll = () => {
    history.push("/all");
  };

  const toProfile = () => {
    history.push("/profile");
  };

  useEffect(() => {
    console.log(addresses);
  }, []);

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
                Hello {user.full_name}
                <span className="f-right red pointer" onClick={toProfile}>
                  View Profile
                </span>
              </p>
            </div>
            <div className="btm">
              <div className="half">
                <p>
                  <b>Address:</b> 608, Building E, Shisi Commercial Center,
                  Vanke World Expo, Shibi Street, Panyu District, Guangzhou
                  <br />
                  <b>Phone:</b> 15603010790
                </p>
                <CopyToClipboard
                  text={`Name: ${user.full_name}, Address: 608, Building E, Shisi Commercial Center, Vanke World Expo, Shibi Street, Panyu District, Guangzhou, Phone: 15603010790`}
                >
                  <span className="copy">copy</span>
                </CopyToClipboard>
              </div>
              <div className="half">
                <p>
                  <b>地址:</b> 广州番禺区石壁街道万科世博会石四商业中心E栋608房{" "}
                  <br />
                  <b>电话:</b> 15603010790 <br />
                </p>
                <CopyToClipboard
                  text={`名称: ${user.full_name}, 地址: 广州番禺区石壁街道万科世博会石四商业中心E栋608房, 电话: 15603010790`}
                >
                  <span className="copy">copy</span>
                </CopyToClipboard>
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
                <th className="web">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((ord) => ord.carts.length)
                .map((row, i) => (
                  <tr key={`row${i}`}>
                    <td style={{ width: "70%" }}>
                      <span className="no">{i + 1}</span>
                      <span style={{ width: "80%", overflow: "hidden" }}>
                        {row.carts[0].cart_name
                          .split(" ")
                          .slice(0, 5)
                          .join(" ") || "---"}
                      </span>
                      <img
                        src={row.carts[0].picture_url}
                        height="20"
                        style={{
                          float: "right",
                          marginRight: "30px",
                          marginTop: "15px",
                        }}
                        alt=""
                      />
                    </td>
                    <td className="web">{row.carts[0].quantity} Units</td>
                    <td className="web">
                      <div
                        className={`dot ${
                          row.status === "Pending"
                            ? "bg-yellow"
                            : row.status === "Cancelled"
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
