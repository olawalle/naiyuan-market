import React, { useContext } from "react";
import "./AllPackages.scss";
import Nav from "../../components/Nav/Nav";
import { withRouter } from "react-router-dom";
import ShippingModal from "../../components/ShippingModal/ShippingModal";
import { useState } from "react";
import { appContext } from "../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
export default withRouter(function AllPackages({ history }) {
  const context = useContext(appContext);
  const { orders } = context;
  const [open, setopen] = useState(false);
  const [pickedItems, setpickedItems] = useState([]);
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [searchVal, setVal] = useState("");
  const [status, setStatus] = useState("all");

  const onCloseModal = () => {
    setopen(false);
  };

  const updateItems = (i) => {
    pickedItems.includes(i)
      ? setpickedItems(pickedItems.filter((j) => j !== i))
      : setpickedItems([...pickedItems, i]);
  };

  const toDash = () => {
    history.push("/dashboard/");
  };

  const filteredOrders = () => {
    return orders.filter((ord) => {
      return status === "all"
        ? ord.reference.toLowerCase().includes(searchVal.toLowerCase())
        : ord.reference.includes(searchVal) && ord.status === status;
    });
  };

  return (
    <div className="all-packages">
      <Nav showLogo={true} />
      <div className="header">
        <div className="left t-left">
          <span onClick={toDash} className="light pointer">
            Dashboard
          </span>
          <span className="thick">My Packages</span>
        </div>
        <div className="right t-right">
          <input
            type="text"
            value={searchVal}
            placeholder="Tracking code"
            onChange={(e) => setVal(e.target.value)}
          />
          <select className="mid" name="" id="">
            <option value=""></option>
          </select>
          <select onChange={(e) => setStatus(e.target.value)} name="" id="">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="gradient">
        <div className="table-wrap">
          <table className="white-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => {
                      e.target.checked
                        ? setpickedItems([...Array(orders.length).keys()])
                        : setpickedItems([]);
                    }}
                  />{" "}
                  Item
                </th>
                <th>Quantity</th>
                <th>Tracking no.</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders().length ? (
                filteredOrders().map((row, i) => (
                  <tr key={`row${i}`}>
                    <td>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={pickedItems.includes(i)}
                        onChange={() => updateItems(i)}
                      />
                      {row.order_name || "---"}
                      <img
                        src={row.picture_url}
                        width="30"
                        alt=""
                        style={{ marginTop: 5 }}
                      />
                    </td>
                    <td>{row.website.name}</td>
                    <td>{row.reference}</td>
                    <td>
                      <b>{row.total}</b>USD
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
                ))
              ) : (
                <tr style={{ border: 0 }}>
                  <td colSpan={6}>No items</td>
                </tr>
              )}
              {filteredOrders().length ? (
                <tr style={{ border: 0 }}>
                  <td
                    colSpan={6}
                    className="t-right pr20"
                    style={{ height: "200px" }}
                  >
                    <button className="white-btn mr15">Quality Check</button>
                    <button
                      className="main-btn"
                      onClick={() => {
                        pickedItems.length
                          ? setopen(true)
                          : openSnackbar(
                              "Please select items to be shipped",
                              5000
                            );
                      }}
                    >
                      Ship
                    </button>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <ShippingModal
        orders={orders}
        isOpen={open}
        pickedItems={pickedItems}
        onCloseModal={onCloseModal}
      />
    </div>
  );
});
