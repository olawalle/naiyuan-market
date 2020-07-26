import React, { useState, useContext } from "react";
import "./SourceProducts.scss";

import screen from "../../../assets/screen.png";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";

export default function SourceProducts() {
  const context = useContext(appContext);
  const { updateCart, removeItem, cart } = context;
  const [orderData, setorderData] = useState({
    website_id: "",
    url: "",
    quantity: "",
    description: "",
    amount: "",
    dateNeeded: "",
  });
  const [hasError, sethasError] = useState(false);
  const [loading, setloading] = useState(false);

  const addToCart = () => {
    const {
      website_id,
      url,
      quantity,
      description,
      amount,
      dateNeeded,
    } = orderData;
    let data = {
      website_id,
      url,
      quantity,
      description,
      amount,
      dateNeeded,
    };
    updateCart(data);
    setorderData({
      website_id: "",
      url: "",
      quantity: "",
      description: "",
      amount: "",
      dateNeeded: "",
    });
  };

  const updateForm = (key, value) => {
    let data = {
      ...orderData,
    };
    data[key] = value;
    setorderData(data);
  };

  const deleteItem = (i) => {
    removeItem(i);
  };

  return (
    <div className="source-products">
      <p className="header">Product Sourcing</p>
      <div className="top gradient">
        <div className="half">
          <div className="inp">
            <span className="label">Description</span>
            <textarea
              name=""
              id=""
              cols="20"
              rows="8"
              className={`w100p border-inp ${
                hasError && !orderData.description && "has-error"
              }`}
              onChange={(e) => updateForm("description", e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="half">
          <div className="inp small">
            <span className="label">Quantity</span>
            <input
              type="text"
              className={`w100p border-inp ${
                hasError && !orderData.quantity && "has-error"
              }`}
              onChange={(e) => updateForm("quantity", e.target.value)}
            />
          </div>
          <span className="jump">Items</span>

          <div className="inp">
            <span className="label">Date Needed</span>
            <input
              type="date"
              className={`w100p border-inp ${
                hasError && !orderData.dateNeeded && "has-error"
              }`}
              onChange={(e) => updateForm("dateNeeded", e.target.value)}
            />
          </div>
        </div>
        <p className="upload">
          <span>Upload product Picture</span>
          <button className="white-btn">Add file</button>
          <br />
          <button onClick={addToCart} className="main-btn">
            Add to cart
          </button>
        </p>{" "}
      </div>

      <div className="btm">
        <p className="heading">Uploads</p>
        <div className="header">
          <div className="item">Item</div>
          <div className="qty">Quantity</div>
          <div className="date">Date Needed</div>
        </div>
        {cart.map((item, i) => {
          return (
            <div key={`item${i}`} className="item-details">
              <div className="item">
                <img src={screen} alt="" className="img" />
                <div className="details">
                  <p className="name">{item.name || "---"}</p>
                  <p className="desc">{item.description}</p>
                  <div className="btns">
                    <button onClick={() => deleteItem(i)} className="main-btn">
                      Delete
                    </button>
                    <button className="bd-btn ml15">Save for later</button>
                  </div>
                </div>
              </div>
              <div className="qty">
                <div className="inp w40p">
                  <input
                    value={item.quantity}
                    readOnly
                    type="text"
                    className="border-inp"
                  />
                </div>
              </div>
              <div className="date">{item.dateNeeded}</div>
            </div>
          );
        })}
        <div className="sub-footer">
          <div className="item"></div>
          <div className="qty">
            <p>Total items</p>
            <p>Tax</p>
            <p>Sourcing fee</p>
          </div>
          <div className="date">
            <p>{cart.length} Item(s)</p>
            <p>
              20.00 <span className="grey">USD</span>
            </p>
            <p>
              20,000.00 <span className="grey">USD</span>
            </p>
          </div>
        </div>
        <div className="footer">
          <div className="item"></div>
          <div className="qty">GRAND TOTAL</div>
          <div className="date">
            <b>2,200</b> <span className="grey">USD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
