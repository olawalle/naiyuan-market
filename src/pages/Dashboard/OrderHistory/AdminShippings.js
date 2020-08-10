import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import Modal from "react-responsive-modal";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../../components/loader/Loader";
import dayjs from "dayjs";

export default withRouter(function AdminShippings({ history }) {
  const [open, setopen] = useState(false);
  const context = useContext(appContext);
  const { websites } = context;
  const [orders, setorders] = useState([]);
  const [order_status, setStatus] = useState("");
  const [selectedId, setselectedId] = useState(null);
  const [loading, setloading] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [updateData, setupdateData] = useState({
    title: "",
    user_shipping_id: "",
    description: "",
    event: "",
    location: "",
    date: "",
  });
  const [filterVal, setFilterVal] = useState({
    inp: "",
    status: "All",
  });
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
    setupdateData({
      ...updateData,
      user_shipping_id: id,
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = () => {
    setfetching(true);
    apiServices
      .adminGetAllShippings()
      .then((res) => {
        let data = res.data.data.map((ord) => {
          return {
            ...ord,
            orders: JSON.parse(ord.orders),
          };
          setfetching(false);
        });
        console.log(data);
        setfetching(false);
        setorders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitUpdateOrder = () => {
    let data = { ...updateData, data: dayjs().format("DD MMM YYYY") };

    setloading(true);
    apiServices
      .updateShipping(data)
      .then((res) => {
        console.log(res);
        setloading(false);
        setopen(false);
        getAllOrders();
        openSnackbar("Order updated successfully", 5000);
      })
      .catch((err) => {
        setloading(false);
        openSnackbar("An error occured. Please try again", 5000);
        console.log(err);
      });
  };

  const filteredOrders = () => {
    let orders_ = [...orders];
    return filterVal.inp
      ? orders_.filter((ord) => {
          return ord.tracking_number === filterVal.inp;
        })
      : orders_;
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
            <span className="label">Title</span>
            <select
              onChange={(e) =>
                setupdateData({
                  ...updateData,
                  title: e.target.value,
                })
              }
              type="text"
              className={`w100p bd-input mb20`}
            >
              <option value="Pending">Ordered</option>
              <option value="Shipped">Ready</option>
              <option value="Cancelled">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            <span className="label">Description</span>
            <input
              type="text"
              className="w100p bd-input mb20"
              onChange={(e) =>
                setupdateData({
                  ...updateData,
                  description: e.target.value,
                })
              }
            />

            <span className="label">Event</span>
            <input
              type="text"
              className="w100p bd-input mb20"
              onChange={(e) =>
                setupdateData({
                  ...updateData,
                  event: e.target.value,
                })
              }
            />

            <span className="label">location</span>
            <input
              type="text"
              className="w100p bd-input mb20"
              onChange={(e) =>
                setupdateData({
                  ...updateData,
                  location: e.target.value,
                })
              }
            />
          </div>

          <button className="main-btn f-right" onClick={submitUpdateOrder}>
            {loading ? <Loader /> : "Submit"}
          </button>
        </div>
      </Modal>
      <div className="header">
        All Shippings
        <div className="form f-right">
          <input
            type="text"
            onChange={(e) => setFilterVal({ inp: e.target.value })}
            placeholder="Tracking no."
            className="f-right mr12"
          />
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

          {!fetching ? (
            <tbody>
              {filteredOrders().map((row, i) => (
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
                        row.status === "Ordered" || !row.status
                          ? "bg-yellow"
                          : row.status === "cancelled"
                          ? "bg-red"
                          : "bg-green"
                      }`}
                    ></div>{" "}
                    <span className="pr10">{row.status || "Ordered"}</span>
                  </td>
                  <td className="pointer" onClick={() => updateOrder(row.id)}>
                    <span
                      style={{
                        padding: "10px 20px",
                        borderRadius: 20,
                        backgroundColor: "#ff130217",
                        color: "#ff0c03",
                      }}
                    >
                      Update
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={5}>Loading</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
});
