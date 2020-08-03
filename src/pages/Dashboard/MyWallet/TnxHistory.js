import React, { useState, useEffect, useContext } from "react";
import "./MyWallet.scss";
import up from "../../../assets/up.svg";
import down from "../../../assets/down.svg";
import calendar from "../../../assets/calendar.svg";
import { appContext } from "../../../store/appContext";
import * as dayjs from "dayjs";

export default function TnxHistory() {
  const context = useContext(appContext);
  const { tnx, orders } = context;
  const [transactions, settransactions] = useState({});
  const [tnx_, setTnx_] = useState([]);
  const [dates, setdates] = useState({ start: null, end: null });

  useEffect(() => {
    let tnx_ = tnx.map((tn) => {
      return {
        ...tn,
        dateNo: tn.created_at
          .split(" ")[0]
          .split("-")
          .reverse()
          .reduce((sum, no) => sum + parseFloat(no), 0),
      };
    });
    setTnx_(tnx_);
    let transactionsObj = tnx_
      .map((t) => {
        return {
          ...t,
          date: dayjs(t.created_at).format("DD MMM YYYY"),
        };
      })
      .reduce((obj, tn) => {
        obj[tn.date] = obj[tn.date] ? [...obj[tn.date], tn] : [tn];
        return obj;
      }, {});
    settransactions(transactionsObj);
  }, []);

  const filterTnx = (n, val) => {
    if (n === 1 && val) {
      setdates({
        ...dates,
        start: val
          .split("-")
          .reverse()
          .reduce((sum, no) => sum + parseFloat(no), 0),
      });
    }
    if (n === 2 && val) {
      setdates({
        ...dates,
        end: val
          .split("-")
          .reverse()
          .reduce((sum, no) => sum + parseFloat(no), 0),
      });
    }

    setTimeout(() => {
      if (dates.end && dates.start) {
        console.log({ start: dates.start, end: dates.end });
      }
    }, 500);
  };

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
                <input
                  type="date"
                  onKeyUp={(e) => {
                    filterTnx(1, e.target.value);
                  }}
                />
                <img src={calendar} alt="" />
              </div>
              <div className="half">
                <p className="to">To</p>
                <input
                  type="date"
                  onKeyUp={(e) => {
                    filterTnx(2, e.target.value);
                  }}
                />
                <img src={calendar} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="big gradient">
          <div className="top">Transactions Record</div>
          <div className="tnxs">
            {Object.keys(transactions).map((key, i) => {
              return (
                <div className="tnx">
                  <span className="date">{key}</span>
                  {transactions[key].map((day) => (
                    <div className="row w100p">
                      <div className="one">
                        <div
                          className={`${
                            day.event !== "Wallet Funding" ? "redd" : "green"
                          }`}
                        >
                          <img
                            src={`${
                              day.event !== "Wallet Funding" ? down : up
                            }`}
                            alt=""
                          />
                        </div>
                        <div className="texts">
                          <p className="txt">{day.event}</p>
                          <p className="sub">{day.event}</p>
                        </div>
                      </div>
                      <div className="two">
                        <div
                          className={`dot ${
                            day.status === "pending"
                              ? "bg-yellow"
                              : day.status === "cancelled"
                              ? "bg-red"
                              : "bg-green"
                          }`}
                        ></div>
                        {day.status}
                      </div>
                      <div className="three">
                        <span
                          className={`${
                            day.event !== "Wallet Funding" ? "out" : "in"
                          }`}
                        >
                          NGN {parseFloat(day.amount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
