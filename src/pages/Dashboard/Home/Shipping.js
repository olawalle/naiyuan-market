import React, { useState, useContext, useEffect } from "react";
import "./Home.scss";

import badge from "../../../assets/Image.svg";
import screen from "../../../assets/screen.png";
import ShippingModal from "../../../components/ShippingModal/ShippingModal";
import { appContext } from "../../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
import apiServices from "../../../services/apiServices";

export default function Shipping() {
  const context = useContext(appContext);
  const { orders, websites } = context;
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  const [open, setopen] = useState(false);
  const [pickedItems, setpickedItems] = useState([]);
  const [shippingTypes, setshippingTypes] = useState([]);

  const onCloseModal = () => {
    setopen(false);
  };

  const updateItems = (i) => {
    pickedItems.includes(i)
      ? setpickedItems(pickedItems.filter((j) => j !== i))
      : setpickedItems([...pickedItems, i]);
  };

  useEffect(() => {
    console.log(orders);
    apiServices
      .getShippingTypes()
      .then((res) => {
        console.log(res);
        setshippingTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <div className="wide">
        <div className="btm-section pt0">
          <p>My Packages</p>
          <table className="main-table">
            <thead>
              <tr>
                <th style={{ width: "60%" }}>
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
                <th>Supplier</th>
                <th>Status</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((row, i) =>
                row.carts.length ? (
                  <tr key={`row${i}`}>
                    <td style={{ width: "40%" }}>
                      <input
                        type="checkbox"
                        checked={pickedItems.includes(i)}
                        onChange={() => updateItems(i)}
                        name=""
                        id=""
                      />
                      <p
                        style={{
                          display: "inline-block",
                          width: "80%",
                          lineHeight: "18px",
                        }}
                      >
                        {row.carts[0].cart_name || "---"}{" "}
                        {row.carts[0].cart_name || "---"}{" "}
                        {row.carts[0].cart_name || "---"}{" "}
                        {row.carts[0].cart_name || "---"}
                      </p>
                      <img
                        src={row.carts[0].picture_url}
                        style={{
                          float: "right",
                          marginTop: 15,
                        }}
                        alt=""
                      />
                    </td>
                    <td>
                      {
                        websites.find(
                          (web) => web.id === row.carts[0].website_id
                        ).name
                      }
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
                      ></div>
                      {row.status}
                    </td>
                    <td>NGN {row.total.toLocaleString()}</td>
                  </tr>
                ) : null
              )}

              <tr style={{ border: 0 }}>
                <td
                  colSpan={4}
                  className="t-right pr20"
                  style={{ height: "200px" }}
                >
                  <button
                    className="main-btn"
                    onClick={() => {
                      pickedItems.length
                        ? setopen(true)
                        : openSnackbar(
                            "Please select items to be Shipped",
                            5000
                          );
                    }}
                  >
                    Ship
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="narrow mt20">
        <img className="badge" src={badge} alt="" />
      </div>

      <ShippingModal
        orders={orders}
        isOpen={open}
        pickedItems={pickedItems}
        onCloseModal={onCloseModal}
        shippingTypes={shippingTypes}
      />
    </div>
  );
}
