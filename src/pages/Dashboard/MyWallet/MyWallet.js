import React, { useContext, useState, useEffect } from "react";
import "./MyWallet.scss";
import up from "../../../assets/up.svg";
import down from "../../../assets/down.svg";
import { appContext } from "../../../store/appContext";
import Modal from "react-responsive-modal";
import Loader from "../../../components/loader/Loader";
import apiServices from "../../../services/apiServices";
import { Balance } from "../Home/Home";
import * as dayjs from "dayjs";
import { Doughnut } from "react-chartjs-2";
import { withRouter } from "react-router-dom";

export default withRouter(function MyWallet({ history }) {
  const context = useContext(appContext);
  const { user, tnx, setTnx, updateUser } = context;
  const [open, setopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paymentlink, setpaymentlink] = useState("");
  const [withdrawing, setwithdrawing] = useState(false);
  const [transactions, settransactions] = useState({});
  const [step, setStep] = useState(1);
  const [account_name, setaccount_name] = useState("");
  const [account_number, setaccount_number] = useState("");
  const [bank_name, setbank_name] = useState("");

  useEffect(() => {
    let transactionsObj = tnx
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
  }, [tnx]);

  useEffect(() => {
    totals();
    getTransactions();
  }, []);

  const totals = () => {
    let moneyIn = tnx.reduce((sum, tx) => {
      if (tx.event === "Wallet Funding") sum += parseFloat(tx.amount);
      return sum;
    }, 0);
    let moneyOut = tnx.reduce((sum, tx) => {
      if (tx.event !== "Wallet Funding") sum += parseFloat(tx.amount);
      return sum;
    }, 0);
    return { moneyIn, moneyOut };
  };

  const onCloseModal = () => {
    setopen(false);
  };

  const toAll = () => {
    history.push("/dashboard/tnx-history");
  };

  const fundWallet = () => {
    let data = {
      email: user.email,
      amount: parseFloat(amount) * 100,
    };
    setLoading(true);
    apiServices
      .requestPaystack(data)
      .then((res) => {
        console.log(res);
        window.open(res.data.payment, "_self");
        setLoading(false);
        // sessionStorage.setItem('naiyuan_ref', res.data.transaction.reference)
        // setwithdrawing(true);
        setopen(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setopen(false);
      });
  };

  const getTransactions = () => {
    apiServices
      .getTnxs()
      .then((tnx) => {
        setTnx(tnx.data.transactions.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWithdrawal = () => {
    setLoading(true);
    let data = { amount, account_name, account_number, bank_name };
    apiServices
      .withdrawFund(data)
      .then((res) => {
        setLoading(false);
        getTransactions();
        fetchUser();
        setopen(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const fetchUser = () => {
    apiServices
      .getCurrentUser()
      .then((res) => {
        updateUser(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: ["Total money Recieved", "Total money spent"],
    datasets: [
      {
        label: "# of Votes",
        data: [totals().moneyIn, totals().moneyOut],
        backgroundColor: ["rgb(247 174 73)", "rgb(201 31 38)"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    // tooltips: {
    //   enabled: false,
    // },
  };

  return (
    <div className="mywallet">
      <Modal open={open} onClose={onCloseModal} center>
        {!withdrawing ? (
          <div
            className="gradient t-center o-hidden placement-modal"
            style={{ padding: "40px" }}
          >
            <div className="inp mb20">
              <span className="label">Amount</span>
              <input
                type="number"
                className={`w100p bd-input`}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button
              className="main-btn w48p f-right"
              onClick={() => fundWallet()}
            >
              {loading ? <Loader /> : "Proceed"}
            </button>
          </div>
        ) : (
          <div
            className="gradient t-center o-hidden placement-modal"
            style={{ padding: "40px" }}
          >
            <div className="heading pt0 mb30">Withdraw</div>
            {step === 1 ? (
              <div className="inp mb20">
                <span className="label">How much do you want to withdraw</span>
                <input
                  type="number"
                  className={`w100p light-input`}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ height: 40, marginBottom: 20 }}
                />
              </div>
            ) : (
              <div className="inp mb20">
                <span className="label">Bank</span>
                <select
                  type="number"
                  className={`w100p light-input`}
                  style={{ height: 40, marginBottom: 20 }}
                  onChange={(e) => setbank_name(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Firstbank">Firstbank</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="Gtb">Gtb</option>
                  <option value="Access Bank">Access Bank</option>
                </select>
                <span className="label">Reciever Name</span>
                <input
                  type="text"
                  className={`w100p light-input`}
                  style={{ height: 40, marginBottom: 20 }}
                  onChange={(e) => setaccount_name(e.target.value)}
                />

                <span className="label">Account Number</span>
                <input
                  type="number"
                  className={`w100p light-input`}
                  style={{ height: 40 }}
                  onChange={(e) => setaccount_number(e.target.value)}
                />
              </div>
            )}
            <button
              className="main-btn w48p f-right"
              onClick={() =>
                step === 1 ? setStep(step + 1) : handleWithdrawal()
              }
            >
              {loading ? <Loader /> : "Proceed"}
            </button>
          </div>
        )}
      </Modal>
      <div className="heading">My Wallet</div>
      <div className="body">
        <div className="small">
          <Balance />

          <button
            className="main-btn w48p f-left"
            onClick={() => {
              setopen(true);
              setwithdrawing(false);
            }}
          >
            Fund wallet
          </button>

          <button
            className="bd-btn w48p f-right"
            onClick={() => {
              setopen(true);
              setwithdrawing(true);
            }}
          >
            Withdraw
          </button>

          <div className="gradient mt20 f-left w100p">
            <div className="top">
              Spendings
              <select name="" id="" className="f-right">
                <option value=""></option>
                {months.map((month) => (
                  <option value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="btm">
              <div className="one">
                <div className="chart">
                  <Doughnut data={data} options={options} />
                </div>
              </div>
              <div className="two">
                <p>
                  <span className="sm">Total money recieved</span>
                  <span className="bg">
                    ₦ {totals().moneyIn.toLocaleString()}
                  </span>
                </p>
                <p>
                  <span className="sm">Total money spent</span>
                  <span className="bg">
                    ₦ {totals().moneyOut.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="big gradient">
          <div className="top">Transactions</div>
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
            <p className="view-all red t-center m0 p15">
              <span style={{ fontSize: 12 }} onClick={toAll}>
                View All Transactions
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
