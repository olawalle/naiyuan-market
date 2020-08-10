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
    setorders_(orders);
  }, []);

  const filteredOrders = (n, val) => {
    let orders_ = [...orders].map((o) => {
      return {
        ...o,
        status: o.status ? o.status : "pending",
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
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="gradient w100p mt50">
        <div className="table-wrap">
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
              {orders_.map((row, i) => (
                <tr key={`row${i}`}>
                  <td>{dayjs(row.created_at).format("DD MMM, YYYY")}</td>
                  <td>
                    {row.order_name || "---"}{" "}
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
    </div>
  );
});
