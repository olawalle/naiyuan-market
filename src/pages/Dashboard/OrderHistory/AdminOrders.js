import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import Modal from "react-responsive-modal";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../../components/loader/Loader";
import dayjs from "dayjs";
import IsAdmin from "../../../components/isAdmin/IsAdmin";

export default withRouter(function AdminOrders({ history }) {
  const [open, setopen] = useState(false);
  const context = useContext(appContext);
  const { websites, allUsers } = context;
  const [orders, setorders] = useState([]);
  const [order_status, setStatus] = useState("");
  const [selectedId, setselectedId] = useState(null);
  const [loading, setloading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [usersObj, setusersObj] = useState({});
  const [openDesc, setopenDesc] = useState(false);
  const [selectedItm, setselectedItm] = useState({});
  const [fetching, setfetching] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const onCloseModal = () => {
    setopen(false);
    setopenDesc(false);
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
    setfetching(true);
    getAllOrders();
    let obj = allUsers.reduce((agg, user) => {
      agg[user.id] = user;
      return agg;
    }, {});
    setusersObj(obj);
  }, []);

  const getAllOrders = () => {
    apiServices
      .adminGetAllOrders()
      .then((res) => {
        setorders(res.data.data);
        setfetching(false);
      })
      .catch((err) => {
        console.log(err);
        setfetching(false);
      });
  };

  const submitUpdateOrder = () => {
    let data = { status: order_status };
    setloading(true);
    apiServices
      .updateOrder(data, selectedId)
      .then((res) => {
        console.log(res);
        setloading(false);
        setopen(false);
        getAllOrders();
        openSnackbar("Order updated successfully", 5000);
      })
      .catch((err) => {
        setloading(false);
        openSnackbar(
          err.response.data.error.message || "An error occured",
          5000
        );
        console.log(err);
      });
  };

  const filteredOrders = () => {
    let orders_ = [...orders];
    let results =
      filterStatus !== "All"
        ? orders_.filter((ord) => {
            return ord.status === filterStatus;
          })
        : orders_;

    return results.filter((r) =>
      r.user.full_name.toLowerCase().includes(filterVal.toLowerCase())
    );
  };

  return (
    <IsAdmin>
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
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
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

        <Modal open={openDesc} onClose={onCloseModal} center>
          <div
            className="gradient t-center o-hidden placement-modal"
            style={{ padding: 30 }}
          >
            <div className="header">Order Details</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ paddingLeft: 0 }}>
                {selectedItm.carts
                  ? selectedItm.carts.map((ordr) => (
                      <div
                        style={{
                          borderBottom: "1px solid #000",
                          paddingBottom: "20px",
                          marginBottom: 20,
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 12,
                            marginBottom: "-10px",
                          }}
                        >
                          Name
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: "#757575",
                          }}
                        >
                          {ordr.cart_name}
                        </p>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 12,
                            marginBottom: "-10px",
                          }}
                        >
                          Description
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: "#757575",
                          }}
                        >
                          {ordr.description}
                        </p>
                        <div>
                          <div
                            style={{ display: "inline-block", width: "50%" }}
                          >
                            <p
                              style={{
                                fontWeight: "bold",
                                marginBottom: "-10px",
                                fontSize: 12,
                              }}
                            >
                              Quantity
                            </p>
                            <p
                              style={{
                                fontSize: 12,
                                color: "#757575",
                              }}
                            >
                              {ordr.quantity}
                            </p>
                          </div>
                          <div
                            style={{ display: "inline-block", width: "50%" }}
                          >
                            <p
                              style={{
                                fontWeight: "bold",
                                marginBottom: "-10px",
                                fontSize: 12,
                              }}
                            >
                              Source
                            </p>
                            <p
                              style={{
                                fontSize: 12,
                                color: "#757575",
                              }}
                            >
                              {
                                websites.find((w) => w.id === ordr.website_id)
                                  .name
                              }
                              <a
                                href={ordr.link}
                                target="_blank"
                                style={{
                                  backgroundColor: "#4a0003",
                                  color: "#fff",
                                  padding: "3px 5px",
                                  borderRadius: 5,
                                  marginLeft: "5px",
                                  textDecoration: "none",
                                }}
                              >
                                view
                              </a>
                            </p>
                          </div>
                        </div>
                        <img
                          src={ordr.picture_url}
                          style={{ width: "70%", marginLeft: "15%" }}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </Modal>
        <div className="header">
          All Orders
          <div className="form f-right">
            <input
              type="text"
              placeholder="serch user"
              style={{ width: "200px" }}
              onChange={(e) => setFilterVal(e.target.value)}
              className="bd-inp"
            />
            <select
              name=""
              id=""
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="gradient w100p mt50">
          <table className="white-table">
            <thead>
              <tr>
                <th>User</th>
                <th style={{ width: "55%" }}>Product/Source</th>
                {/* <th></th> */}
                {/* <th>Tracking no.</th> */}
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            {!fetching ? (
              <tbody>
                {filteredOrders().map((row, i) =>
                  row.carts.length ? (
                    <tr key={`row${i}`}>
                      <td style={{ fontSize: 12 }}>{row.user.full_name}</td>
                      <td
                        style={{ fontSize: 12 }}
                        onClick={() => {
                          setopenDesc(true);
                          setselectedItm(row);
                        }}
                      >
                        {row.carts.slice(0, 1).map((itm) => {
                          return (
                            <ul style={{ paddingLeft: 0 }}>
                              <li>
                                <p
                                  style={{
                                    lineHeight: "16px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <span>{itm.cart_name}</span> /
                                  <span>
                                    {
                                      websites.find(
                                        (web) => web.id === itm.website_id
                                      ).name
                                    }
                                  </span>
                                </p>
                              </li>
                            </ul>
                          );
                        })}
                      </td>
                      {/* <td style={{ fontSize: 12 }}>{row.reference}</td> */}
                      <td style={{ fontSize: 12 }}>
                        <b>NGN {parseFloat(row.total).toLocaleString()}</b>
                      </td>
                      <td style={{ fontSize: 12 }}>
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
                      </td>
                      <td
                        className="pointer"
                        onClick={() => updateOrder(row.id)}
                      >
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
                  ) : null
                )}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={6}>Loading</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </IsAdmin>
  );
});
