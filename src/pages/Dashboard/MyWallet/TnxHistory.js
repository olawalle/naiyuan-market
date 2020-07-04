import React from "react";
import "./MyWallet.scss";
import up from "../../../assets/up.svg";
import down from "../../../assets/down.svg";
import calendar from "../../../assets/calendar.svg";

export default function TnxHistory() {
  return (
    <div className="mywallet">
      <div className="heading">Transaction</div>
      <div className="body">
        <div className="small">
          <div className="gradient f-left w100p">
            <div className="top">Time Period</div>
            <div className="btm">
              <div className="half">
                <p className="to">From</p>
                <input type="date" />
                <img src={calendar} alt="" />
              </div>
              <div className="half">
                <p className="to">From</p>
                <input type="date" />
                <img src={calendar} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="big gradient">
          <div className="top">Transactions Record</div>
          <div className="tnxs">
            {[1, 2, 3, 4, 5, 6, 7, 9].map((row, i) => (
              <div className="tnx">
                <span className="date">20th Oct, 2019</span>
                <div className="row w100p">
                  <div className="one">
                    <div className={`${i % 3 ? "redd" : "green"}`}>
                      <img src={`${i % 3 ? down : up}`} alt="" />
                    </div>
                    <div className="texts">
                      <p className="txt">Transfer to John Doe</p>
                      <p className="sub">Paid to supplier</p>
                    </div>
                  </div>
                  <div className="two">
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
                  </div>
                  <div className="three">
                    <span className={`${i % 3 ? "out" : "in"}`}>
                      $234,342.10
                    </span>
                  </div>
                </div>
                <div className="row w100p">
                  <div className="one">
                    <div className={`${i % 3 ? "redd" : "green"}`}>
                      <img src={`${i % 3 ? down : up}`} alt="" />
                    </div>
                    <div className="texts">
                      <p className="txt">Transfer to John Doe</p>
                      <p className="sub">Paid to supplier</p>
                    </div>
                  </div>
                  <div className="two">
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
                  </div>
                  <div className="three">
                    <span className={`${i % 3 ? "out" : "in"}`}>
                      $234,342.10
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <p className="view-all red t-center m0 p15">
              <span style={{ fontSize: 12 }}>View All Transactions</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
