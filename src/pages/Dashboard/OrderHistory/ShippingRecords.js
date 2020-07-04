import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";

export default withRouter(function ShippingRecords({ history }) {
  return (
    <div className="orderHistory">
      <div className="header">
        Shipping Records
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
              <th>Tracking no.</th>
              <th>Shipping Fee</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 9].map((row, i) => (
              <tr key={`row${i}`}>
                <td>Oct-20-2020</td>
                <td>Cheese</td>
                <td>Ali express</td>
                <td>1434</td>
                <td>
                  <b>3,200.00</b>USD
                </td>
                <td>
                  <div
                    className={`dot ${
                      !(i % 2) ? "bg-yellow" : !(i % 3) ? "bg-red" : "bg-green"
                    }`}
                  ></div>{" "}
                  <span className="pr10">Delivered</span>
                  <select
                    name=""
                    id=""
                    className="pl12 ml30"
                    style={{
                      height: "25px",
                      width: "60px",
                      border: "1px solid #dfdfdf",
                      borderRadius: "4px",
                    }}
                  >
                    <option value=""></option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
