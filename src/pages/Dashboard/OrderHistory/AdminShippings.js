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

export default withRouter(function AdminShippings({ history }) {
  const [open, setopen] = useState(false);
  const context = useContext(appContext);
  const { websites } = context;
  const [orders, setorders] = useState([]);
  const [order_status, setStatus] = useState("");
  const [selectedId, setselectedId] = useState(0);
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
  const [openDesc, setopenDesc] = useState(false);
  const [selectedItm, setSelectedItm] = useState({});
  const [filterVal, setFilterVal] = useState({
    inp: "",
    status: "All",
  });
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
          let items = [];
          JSON.parse(ord.orders).forEach((or) => {
            items.push([...or.carts]);
          });
          return {
            ...ord,
            items: items.flat(),
          };
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
        openSnackbar(
          err.response.data.error.message || "An error occured",
          5000
        );
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
    <IsAdmin>
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
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
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
        <Modal open={openDesc} onClose={onCloseModal} center>
          <div
            className="gradient t-center o-hidden placement-modal"
            style={{ padding: 30 }}
          >
            <div className="header">Order Details</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ paddingLeft: 0 }}>
                {selectedItm.items
                  ? selectedItm.items.map((ordr) => (
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
                            fontSize: 14,
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
                            fontSize: 14,
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
                <th>Items</th>
                <th>User</th>
                <th>Tracking no.</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            {!fetching ? (
              <tbody>
                {filteredOrders().map((row, i) => (
                  <tr key={`row${i}`}>
                    <td
                      onClick={() => {
                        setopenDesc(true);
                        setSelectedItm(row);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <ul style={{ paddingLeft: 0 }}>
                        {row.items.map((ordr) => (
                          <li style={{ height: 16, lineHeight: "16px" }}>
                            {ordr.cart_name}({ordr.quantity})
                            <img
                              src={ordr.picture_url}
                              style={{ width: "20px", float: "right" }}
                            />
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{row.user.full_name}</td>
                    <td>{row.tracking_number}</td>
                    <td>
                      <div
                        className={`dot ${
                          row.status === "Ordered" || !row.status
                            ? "bg-yellow"
                            : row.status === "Cancelled"
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
