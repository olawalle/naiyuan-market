import React, { useState } from "react";
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

export default function Dashboard() {
  let match = useRouteMatch();
  const [sideOpen, setsideOpen] = useState(true);
  const [open, setopen] = useState(false);
  const [makePayment, setmakePayment] = useState(false);

  const onOpenModal = (n) => {
    setopen(true);
    n === 1 ? setmakePayment(true) : setmakePayment(false);
  };

  const onCloseModal = () => {
    setopen(false);
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
        {makePayment ? (
          <div className="gradient t-center o-hidden placement-modal">
            <p className="heading ">Make payment</p>
            <p className="amount mt55">
              <span className="title">Total Amount</span>
              <span className="amt">$89,000.00</span>
            </p>
            <div className="form w100p mt12">
              <div className="inp w100p">
                <select className="border-inp w100p" name="" id="">
                  <option value=""></option>
                </select>
              </div>
              <button className="main-btn w100p">Continue</button>
            </div>
          </div>
        ) : (
          <div className="gradient t-left o-hidden placement-modal currency-modal">
            <p className="heading ">Currency Calculator</p>
            <p className="amount mt55">
              <span className="title">1 Nigerian Naira equals </span>
              <span className="amt mb12">0.002 United states Dollar</span>
              <span className="title tt_">11 June, 20202 Disclaimer</span>
            </p>
            <div className="form w100p mt12">
              <div className="inp w48p f-left">
                <input className="border-inp w100p" />
              </div>
              <div className="inp w48p f-right">
                <input className="border-inp w100p" />
              </div>
              <div className="inp w48p f-left">
                <input className="border-inp w100p" />
              </div>
              <div className="inp w48p f-right">
                <input className="border-inp w100p" />
              </div>
            </div>
          </div>
        )}
      </Modal>

      <HashRouter>
        <div className={`dash-contents ${!sideOpen ? "wide" : "narrow"}`}>
          <Nav />
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
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}
