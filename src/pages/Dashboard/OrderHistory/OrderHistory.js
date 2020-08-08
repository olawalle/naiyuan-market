import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import { useContext } from "react";
import { appContext } from "../../../store/appContext";

export default withRouter(function OrderHistory({ history }) {
  const context = useContext(appContext);
  const { orders, websites } = context;

  return (
    <div className="orderHistory">
      <div className="header">
        Order History
        <div className="form f-right">
          <input type="text" />
          <select name="" id="">
            <option value=""></option>
          </select>
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
      </div>

      <div className="gradient w100p mt50">
        <table className="white-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Source</th>
              <th>Reference no.</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((row, i) => (
              <tr key={`row${i}`}>
                <td>{row.created_at}</td>
                <td>
                  {row.name || "---"}{" "}
                  <img src={row.picture_url} width={30} alt="" />
                </td>
                <td>
                  {websites.find((web) => web.id === row.website_id).name}
                </td>
                <td>{row.reference}</td>
                <td>
                  <b>$ {row.total}</b>
                </td>
                <td>
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
                  {/* <select
                    name=""
                    id=""
                    className="pl12 bd-input"
                    style={{
                      height: "25px",
                      width: "60px",
                      border: "1px solid #dfdfdf",
                      borderRadius: "4px",
                    }}
                  >
                    <option value=""></option>
                  </select> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
