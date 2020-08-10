import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import Modal from "react-responsive-modal";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../../components/loader/Loader";
import dayjs from "dayjs";
import { mainUrl } from "../../../services/urls";

export default withRouter(function AdminProcurements({ history }) {
  const [open, setopen] = useState(false);
  const context = useContext(appContext);
  const { websites } = context;
  const [orders, setorders] = useState([]);
  const [order_status, setStatus] = useState("");
  const [selectedId, setselectedId] = useState(null);
  const [loading, setloading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
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
      .adminGetAllProcurements()
      .then((res) => {
        console.log(res);
        setorders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitUpdateOrder = () => {
    // let data = { order_status };
    // setloading(true);
    // apiServices
    //   .updateOrder(data, selectedId)
    //   .then((res) => {
    //     console.log(res);
    //     setloading(false);
    setopen(false);
    //     openSnackbar("Order updated successfully", 5000);
    //   })
    //   .catch((err) => {
    //     setloading(false);
    //     openSnackbar("An error occured. Please try again", 5000);
    //     console.log(err);
    //   });
  };

  const filteredOrders = () => {
    let orders_ = [...orders];
    return filterStatus !== "All"
      ? orders_.filter((ord) => {
          return ord.status === filterStatus;
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
        All Orders
        {/* <div className="form f-right">
          <select
            name=""
            id=""
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="pending">pending</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
            <option value="delivered">Delivered</option>
          </select>
        </div> */}
      </div>

      <div className="gradient w100p mt50">
        <table className="white-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Picture</th>
              <th>Quantity</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders().map((row, i) => (
              <tr key={`row${i}`}>
                <td>{dayjs(row.created_at).format("DD MMM, YYYY")}</td>
                <td>{row.description}</td>
                <td>
                  <img
                    src={`${mainUrl}/image/${JSON.parse(row.picture)[0].path}`}
                    alt=""
                    width={200}
                  />
                </td>
                <td>{row.quantity}</td>
                <td>
                  <b>{row.user.full_name}</b>
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
        </table>
      </div>
    </div>
  );
});
