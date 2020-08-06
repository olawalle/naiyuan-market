import React, { useState, useEffect } from "react";
import "./Dashboard.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import back from "../../assets/back-arrow.svg";
import Home from "./Home/Home";
import Shipping from "./Home/Shipping";
import { useRouteMatch, HashRouter, Switch, Route } from "react-router-dom";
import { Modal } from "react-responsive-modal";

import Nav from "../../components/Nav/Nav";
import SourceProducts from "./SourceProducts/SourceProducts";
import OrderHistory from "./OrderHistory/OrderHistory";
import MyWallet from "./MyWallet/MyWallet";
import TnxHistory from "./MyWallet/TnxHistory";
import ShippingRecords from "./OrderHistory/ShippingRecords";
import PaySupplier from "./PaySupplier/PaySupplier";
import Tracking from "./Tracking/Tracking";
import Support from "./Support/Support";
import apiServices from "../../services/apiServices";
import { useContext } from "react";
import { appContext } from "../../store/appContext";
import AdminOrders from "./OrderHistory/AdminOrders";
import Rates from "./Rates/Rates";
import Websites from "./Rates/Websites";
import OrderPlacement from "./SourceProducts/OrderPlacement";
import VerifyPayment from "../Login/VerifyPayment";
import Notifications from "./OrderHistory/Notifications";
import ShippingTypes from "./Rates/ShippingTypes";
import AdminShippings from "./OrderHistory/AdminShippings";

export default function Dashboard() {
  const context = useContext(appContext);
  const {
    updateNotifications,
    saveOrders,
    setWebsites,
    websites,
    setrates,
    rates,
  } = context;

  let match = useRouteMatch();
  const [sideOpen, setsideOpen] = useState(true);
  const [open, setopen] = useState(false);
  const [makePayment, setmakePayment] = useState(false);
  const [topAmt, setTopAmt] = useState(1);
  const [topSym, setTopSym] = useState("Naira");
  const [btmAmt, setBtmAmt] = useState(null);
  const [btmSym, setBtmSym] = useState("Dollar");

  const onOpenModal = (n) => {
    setopen(true);
    n === 1 ? setmakePayment(true) : setmakePayment(false);
  };

  const onCloseModal = () => {
    setopen(false);
  };

  const calculate = (n) => {
    let naira_dollar = rates.find((r) => r.pair === "Naira/Dollar");
    let naira_yuan = rates.find((r) => r.pair === "Naira/Yuan");
    let oneDollar = naira_dollar
      ? parseFloat(naira_dollar.rate.split("/")[0])
      : 0;
    let oneYuan = naira_yuan ? parseFloat(naira_yuan.rate.split("/")[0]) : 0;
    let dollar_yuan_rate = oneDollar / oneYuan;

    if (topSym === "Naira") {
      btmSym === "Dollar"
        ? setBtmAmt(topAmt * oneDollar)
        : setBtmAmt(topAmt * oneYuan);
    }

    if (topSym === "Dollar") {
      btmSym === "Naira"
        ? setBtmAmt(topAmt / oneDollar)
        : setBtmAmt(topAmt * dollar_yuan_rate);
    }

    if (topSym === "Yuan") {
      btmSym === "Naira"
        ? setBtmAmt(topAmt * oneYuan)
        : setBtmAmt(topAmt / dollar_yuan_rate);
    }

    if (topSym === btmSym) {
      setBtmAmt(topAmt);
    }
  };

  useEffect(() => {
    apiServices
      .getRates()
      .then((res) => {
        console.log(res.data);
        setrates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    apiServices
      .getOrders()
      .then((res) => {
        saveOrders(res.data.orders.data);
      })
      .catch((err) => {
        console.log(err);
      });

    apiServices
      .getWebsites()
      .then((res) => {
        setWebsites(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    apiServices
      .getNotifications()
      .then((res) => {
        updateNotifications(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    calculate();
  }, [topSym, topAmt, btmSym, btmAmt]);

  const dollaAmt = () => {
    let dollar = rates.find((r) => r.pair === "Naira/Dollar");
    let dollarRate = dollar ? (1 / dollar.rate.split("/")[0]).toFixed(4) : 0;
    return dollarRate;
  };

  return (
    <div className="dashboard">
      <div className={`side-wrap ${sideOpen ? "open" : ""}`}>
        <Sidebar onOpenModal={onOpenModal} sideOpen={sideOpen} />
        <div className="arrow pointer" onClick={() => setsideOpen(!sideOpen)}>
          <img src={back} className={`${!sideOpen ? "rotate" : ""}`} alt="" />
        </div>
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <div className="gradient t-left o-hidden placement-modal currency-modal">
          <p className="heading ">Currency Calculator</p>
          <p className="amount mt55">
            <span className="title">1 Nigerian Naira equals </span>
            <span className="amt mb12">{dollaAmt()} United states Dollars</span>
            <span className="title tt_">11 June, 2020 Disclaimer</span>
          </p>
          <div className="form w100p mt12">
            <div className="inp w48p f-left">
              <input
                type="number"
                value={topAmt}
                onChange={(e) => {
                  setTopAmt(e.target.value);
                  calculate();
                }}
                className="border-inp w100p"
              />
            </div>
            <div className="inp w48p f-right">
              <select
                onChange={(e) => {
                  setTopSym(e.target.value);
                  calculate();
                }}
                defaultValue={topSym}
                className="border-inp w100p"
              >
                <option value="Naira">Naira</option>
                <option value="Yuan">Yuan</option>
                <option value="Dollar">Dollar</option>
              </select>
            </div>
          </div>
          <div className="form w100p mt12">
            <div className="inp w48p f-left">
              <input
                type="number"
                value={btmAmt}
                onChange={(e) => {
                  setBtmAmt(e.target.value);
                  calculate();
                }}
                className="border-inp w100p"
                readOnly
              />
            </div>
            <div className="inp w48p f-right">
              <select
                onChange={(e) => {
                  setBtmSym(e.target.value);
                  calculate();
                }}
                defaultValue={btmSym}
                className="border-inp w100p"
              >
                <option value="Yuan">Yuan</option>
                <option value="Dollar">Dollar</option>
                <option value="Naira">Naira</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>

      <HashRouter>
        <div className={`dash-contents ${!sideOpen ? "wide" : "narrow"}`}>
          <Nav onOpenModal={onOpenModal} />
          <Switch>
            <Route exact path={`${match.path}`}>
              <Home />
            </Route>

            <Route path={`${match.path}source-products`}>
              <SourceProducts />
            </Route>

            <Route path={`${match.path}order-history`}>
              <OrderHistory />
            </Route>

            <Route path={`${match.path}order-placement`}>
              <OrderPlacement />
            </Route>

            <Route path={`${match.path}my-wallet`}>
              <MyWallet />
            </Route>

            <Route path={`${match.path}tnx-history`}>
              <TnxHistory />
            </Route>
            <Route path={`${match.path}shipping`}>
              <Shipping />
            </Route>
            <Route path={`${match.path}shipping-records`}>
              <ShippingRecords />
            </Route>

            <Route path={`${match.path}orders`}>
              <AdminOrders />
            </Route>

            <Route path={`${match.path}shippings`}>
              <AdminShippings />
            </Route>
            <Route path={`${match.path}pay-supplier`}>
              <PaySupplier />
            </Route>
            <Route path={`${match.path}tracking`}>
              <Tracking />
            </Route>
            <Route path={`${match.path}support`}>
              <Support />
            </Route>
            <Route path={`${match.path}exchange-rates`}>
              <Rates />
            </Route>
            <Route path={`${match.path}websites`}>
              <Websites />
            </Route>
            <Route path={`${match.path}shipping-types`}>
              <ShippingTypes />
            </Route>
            <Route path={`${match.path}verify-payment`}>
              <VerifyPayment />
            </Route>
            <Route path={`${match.path}notifications`}>
              <Notifications />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}
