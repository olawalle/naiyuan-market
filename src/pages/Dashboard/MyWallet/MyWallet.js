import React from "react";
import "./MyWallet.scss";
import up from "../../../assets/up.svg";
import down from "../../../assets/down.svg";

export default function MyWallet() {
  return (
    <div className="mywallet">
      <div className="heading">My Wallet</div>
      <div className="body">
        <div className="small">
          <div className="balance">
            <span className="title">Wallet Balance</span>
            <span className="amt">N20,000</span>
          </div>

          <button className="main-btn w48p f-left">Fund wallet</button>

          <button className="bd-btn w48p f-right">Withdraw</button>

          <div className="gradient mt20 f-left w100p">
            <div className="top">
              Spendings
              <select name="" id="" className="f-right">
                <option value=""></option>
              </select>
            </div>
            <div className="btm"></div>
          </div>
        </div>
        <div className="big gradient">
          <div className="top">Transactions</div>
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
