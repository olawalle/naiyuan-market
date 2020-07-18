import React from "react";
import "./Home.scss";

import badge from "../../../assets/Image.svg";
import screen from "../../../assets/screen.png";
import { withRouter } from "react-router-dom";

const Balance = () => {
  return (
    <div className="balance">
      <span className="title">Wallet Balance</span>
      <span className="amt">N20,000</span>
    </div>
  );
};

export default withRouter(function Home({ history }) {
  const toAll = () => {
    history.push("/all");
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
                <span className="f-right red">View Profile</span>
              </p>
            </div>
            <div className="btm">
              <b>Address:</b> ad eveniet hic quibusdam iusto incidunt
              repudiandae adipisci? Quibusdam, unde architecto!
            </div>
          </div>
          <div className="half gradient f-right">
            <div className="heading">
              <p>
                Todays Exchange Rate
                <span className="f-right red">View Profile</span>
              </p>
            </div>
            <div className="btm">
              <div className="thirds">
                <p className="red">Naira/Yuan</p>
                <span>445.00/6.123</span>
              </div>
              <div className="thirds">
                <p className="red">Naira/Yuan</p>
                <span>445.00/6.123</span>
              </div>
              <div className="thirds">
                <p className="red">Naira/Yuan</p>
                <span>445.00/6.123</span>
              </div>
            </div>
          </div>
        </div>
        <div className="btm-section">
          <p>My Packages</p>
          <table className="main-table">
            <thead>
              <tr>
                <th>Item</th>
                <th className="web">Qty</th>
                <th className="web">Total Cost</th>
                <th>Tracking ID</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 9].map((row, i) => (
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
                  <td>IU2387GGJ08U</td>
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
        <img className="badge" src={badge} alt="" />
      </div>
    </div>
  );
});
