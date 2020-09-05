import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import { useContext } from "react";
import { appContext } from "../../../store/appContext";
import dayjs from "dayjs";

export default withRouter(function OrderHistory({ history }) {
  const context = useContext(appContext);
  const { orders, websites } = context;
  const [orders_, setorders_] = useState([]);
  const [filterVal, setFilterVal] = useState({
    inp: "",
    status: "All",
  });

  useEffect(() => {
    // let red = orders.reduce((payload, order) => {
    //   payload.push(...order.carts);
    //   return payload;
    // }, []);
    console.log({ orders });
    setorders_(orders.filter((order) => order.carts.length));
  }, []);

  const filteredOrders = (n, val) => {
    let orders_ = [...orders].map((o) => {
      return {
        ...o,
        status: o.status ? o.status : "Pending",
      };
    });
    let data =
      n === 1
        ? val === "All"
          ? orders_
          : orders_.filter((ord) => {
              return ord.status === val;
            })
        : !filterVal.inp
        ? orders_
        : orders_.filter((ord) => {
            return ord.reference.includes(val);
          });
    setorders_(data);
  };

  return (
    <div className="orderHistory">
      <div className="header">
        Order History
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

      <div className="gradient w100p mt50">
        <div className="table-wrap">
          <table className="white-table">
            <thead>
              <tr>
                <th>Date</th>
                <th style={{ width: "55%" }}>Product</th>
                <th>Source</th>
                {/* <th>Reference no.</th> */}
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders_.map((row, i) =>
                row.carts.length ? (
                  <tr key={`row${i}`}>
                    <td>{dayjs(row.created_at).format("DD MMM, YYYY")}</td>
                    <td>
                      <p
                        style={{
                          lineHeight: "18px",
                          display: "inline-block",
                          width: "80%",
                        }}
                      >
                        {row.carts[0].cart_name || "---"}
                      </p>
                      <img src={row.carts[0].picture_url} width={30} alt="" />
                    </td>
                    <td>
                      {
                        websites.find(
                          (web) => web.id === row.carts[0].website_id
                        ).name
                      }
                    </td>
                    {/* <td>{row.reference}</td> */}
                    <td>
                      <b>NGN {row.total.toLocaleString()}</b>
                    </td>
                    <td>
                      <div
                        className={`dot ${
                          row.status === "Pending"
                            ? "bg-yellow"
                            : row.status === "Cancelled"
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
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
