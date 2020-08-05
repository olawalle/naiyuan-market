import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import { appContext } from "../../../store/appContext";
import { useEffect } from "react";

export default withRouter(function ShippingRecords({ history }) {
  const context = useContext(appContext);
  const { shippings, userShippings } = context;
  const [orderShippings, setorderShippings] = useState([]);

  useEffect(() => {
    console.log(shippings);
    let orderShippings = shippings
      .map((shipping) => {
        let orders = JSON.parse(shipping.orders);
        return orders.map((order) => {
          return {
            order: {
              ...order,
              name: order.description
                .split(" ")
                .filter((o, i) => i <= 5)
                .join(" "),
            },
            shipping,
          };
        });
      })
      .flat();
    setorderShippings(orderShippings);
    console.log(orderShippings);
  }, []);

  return (
    <div className="orderHistory">
      <div className="header">
        <p>Shipping Records</p>
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

      <div className="gradient w100p mt15">
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
            {orderShippings.map((row, i) => (
              <tr key={`row${i}`}>
                <td>{row.shipping.created_at}</td>
                <td>{row.order.name}</td>
                <td>{row.order.website.name}</td>
                <td>{row.shipping.tracking_number}</td>
                <td>
                  <b>{row.shipping.cost}</b>USD
                </td>
                <td>
                  <div
                    className={`dot ${
                      !row.shipping.status || row.shipping.status === "pending"
                        ? "bg-yellow"
                        : row.shipping.status === "cancelled"
                        ? "bg-red"
                        : "bg-green"
                    }`}
                  ></div>{" "}
                  <span className="pr10">
                    {row.shipping.status || "pending"}
                  </span>
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
