import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import { appContext } from "../../../store/appContext";
import { useEffect } from "react";
import * as dayjs from "dayjs";

export default withRouter(function ShippingRecords({ history }) {
  const context = useContext(appContext);
  const { shippings, userShippings } = context;
  const [orderShippings, setorderShippings] = useState([]);
  const [orders_, setorders_] = useState([]);
  const [usersObj, setusersObj] = useState({});
  const [filterVal, setFilterVal] = useState({
    inp: "",
    status: "All",
  });

  useEffect(() => {
    // let obj = allUsers.reduce((agg, user) => {
    //   agg[user.id] = user;
    //   return agg;
    // }, {});
    // console.log(obj);
    // setusersObj(obj);
    let orderShippings = shippings
      .map((shipping) => {
        let orders = JSON.parse(shipping.orders);
        return orders.map((order) => {
          return {
            order: {
              ...order,
              name: "order.description",
              // .split(" ")
              // .filter((o, i) => i <= 5)
              // .join(" "),
            },
            shipping,
          };
        });
      })
      .flat();
    setorderShippings(orderShippings);
    setorders_(orderShippings);
    console.log({ orderShippings });
  }, []);

  const filteredOrders = (n, val) => {
    let orders_ = [...orderShippings].map((o) => {
      return {
        ...o,
        status: o.status ? o.status : "Pending",
      };
    });
    console.log({ orders_ });
    let data =
      n === 1
        ? val === "All"
          ? orders_
          : orders_.filter((ord) => {
              return ord.status === val;
            })
        : !val
        ? orders_
        : orders_.filter((ord) => {
            return ord.shipping.tracking_number.includes(val);
          });
    setorders_(data);
  };

  return (
    <div className="orderHistory">
      <div className="header">
        <p>Shipping Records</p>
        <div className="form f-right">
          <input
            type="text"
            onChange={(e) => {
              filteredOrders(2, e.target.value);
              setFilterVal({ ...filterVal, inp: e.target.value });
            }}
            placeholder="Tracking no."
          />
          <select
            onChange={(e) => {
              filteredOrders(1, e.target.value);
              setFilterVal({ ...filterVal, status: e.target.value });
            }}
            type="text"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
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
            {orders_.map((row, i) => (
              <tr key={`row${i}`}>
                <td>{dayjs(row.shipping.created_at).format("DD MMM YYYY")}</td>
                <td>{row.order.carts[0].cart_name}</td>
                <td>{row.order.carts[0].website_id}</td>
                <td>{row.shipping.tracking_number}</td>
                <td>
                  NGN{" "}
                  <b>
                    {parseFloat(row.shipping.shipping.rate).toLocaleString()}
                  </b>
                </td>
                <td>
                  <div
                    className={`dot ${
                      !row.shipping.status || row.shipping.status === "Pending"
                        ? "bg-yellow"
                        : row.shipping.status === "Cancelled"
                        ? "bg-red"
                        : "bg-green"
                    }`}
                  ></div>{" "}
                  <span className="pr10">
                    {row.shipping.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
            {!orders_.length ? (
              <tr>
                <td colSpan="6">No records</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
});
