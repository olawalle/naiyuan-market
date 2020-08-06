import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import Modal from "react-responsive-modal";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../../components/loader/Loader";

export default withRouter(function AdminShippings({ history }) {
  const [open, setopen] = useState(false);
  const context = useContext(appContext);
  const { websites } = context;
  const [orders, setorders] = useState([]);
  const [order_status, setStatus] = useState("");
  const [selectedId, setselectedId] = useState(null);
  const [loading, setloading] = useState(false);
  const onCloseModal = () => {
    setopen(false);
  };
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  const updateOrder = (id) => {
    setopen(true);
    setselectedId(id);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    apiServices
      .adminGetAllShippings()
      .then((res) => {
        let data = res.data.data.map((ord) => {
          return {
            ...ord,
            orders: JSON.parse(ord.orders),
          };
        });
        console.log(data);
        setorders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitUpdateOrder = () => {
    let data = { order_status };
    setloading(true);
    apiServices
      .updateOrder(data, selectedId)
      .then((res) => {
        console.log(res);
        setloading(false);
        setopen(false);
        openSnackbar("Order updated successfully", 5000);
      })
      .catch((err) => {
        setloading(false);
        openSnackbar("An error occured. Please try again", 5000);
        console.log(err);
      });
  };

  return (
    <div className="orderHistory">
      <Modal open={open} onClose={onCloseModal} center>
        <div
          className="gradient t-center o-hidden placement-modal"
          style={{ padding: 30 }}
        >
          <div className="header">Update Order</div>

          <div className="inp mb20">
            <span className="label">Status</span>
            <select
              onChange={(e) => setStatus(e.target.value)}
              type="text"
              className={`w100p bd-input`}
            >
              <option value="Pending">pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button className="main-btn f-right" onClick={submitUpdateOrder}>
            {loading ? <Loader /> : "Submit"}
          </button>
        </div>
      </Modal>
      <div className="header">
        All Shippings
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
              <th>Items</th>
              {/* <th>Source</th> */}
              <th>Tracking no.</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((row, i) => (
              <tr key={`row${i}`}>
                <td>{row.created_at}</td>
                <td>
                  <ul style={{ paddingLeft: 0 }}>
                    {row.orders.map((ordr) => (
                      <li style={{ height: 16, lineHeight: "16px" }}>
                        {ordr.description
                          .split(" ")
                          .filter((o, i) => i <= 5)
                          .join(" ")}{" "}
                        ({ordr.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                {/* <td>{row.website.name}</td> */}
                <td>{row.tracking_number}</td>
                <td>
                  <b>${row.cost}</b>
                </td>
                <td>
                  <div
                    className={`dot ${
                      row.status === "pending" || !row.status
                        ? "bg-yellow"
                        : row.status === "cancelled"
                        ? "bg-red"
                        : "bg-green"
                    }`}
                  ></div>{" "}
                  <span className="pr10">{row.status || "pending"}</span>
                </td>
                <td className="pointer" onClick={() => updateOrder(row.id)}>
                  Update
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
