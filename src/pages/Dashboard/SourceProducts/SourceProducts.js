import React, { useState, useContext, useEffect } from "react";
import "./SourceProducts.scss";

import screen from "../../../assets/screen.png";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { mainUrl } from "../../../services/urls";
import Loader from "../../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";

export default function SourceProducts() {
  const context = useContext(appContext);
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const { updateCart, removeItem, cart, clearCart } = context;
  const [orderData, setorderData] = useState({
    requested_date: "",
    picture: [],
    quantity: "",
    description: "",
  });
  const [hasError, sethasError] = useState(false);
  const [loading, setloading] = useState(false);
  const [uploadingImage, setuploadingImage] = useState(false);

  const addToCart = () => {
    const { quantity, description, requested_date, picture } = orderData;
    let data = {
      picture,
      quantity,
      description,
      requested_date,
    };
    updateCart(data);
    setorderData({
      requested_date: "",
      picture: [],
      quantity: "",
      description: "",
    });
  };

  // const getBase64Image = (file, callback) => {
  //   const reader = new FileReader();

  //   reader.addEventListener("load", () => callback(reader.result));

  //   reader.readAsDataURL(file);
  // };

  // const b64toBlob = (b64Data) => {
  //   const url = b64Data;
  //   let result = "";
  //   fetch(url).then((res) => {
  //     result = res.blob();
  //     return result;
  //   });
  // };

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

  const checkout = () => {
    let data = cart.map((itm) => {
      return {
        ...itm,
        picture: JSON.stringify(itm.picture),
      };
    });
    setloading(true);
    data.map((item) => {
      apiServices
        .postProcurement(item)
        .then((res) => {
          openSnackbar("Order placed sucessfully", 5000);
          clearCart();
          setloading(false);
        })
        .catch((err) => {
          console.log({ err });
          setloading(false);
        });
    });
  };

  const uploadPhoto = (file) => {
    let filesize = parseFloat(file.size / 1024 / 1024);
    if (filesize > 2) {
      openSnackbar("Image must be less than 2MB in size", 5000);
      return;
    }
    let data = new FormData();
    data.append("picture", file);
    setuploadingImage(true);
    apiServices
      .uploadPic(data)
      .then((res) => {
        setuploadingImage(false);
        openSnackbar("Image uploaded sucessfully", 5000);
        updateForm("picture", [...orderData.picture, res.data.picture]);
      })
      .catch((err) => {
        setuploadingImage(false);
        console.log(err);
      });
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
              value={orderData.description}
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
              value={orderData.quantity}
              onChange={(e) => updateForm("quantity", e.target.value)}
            />
          </div>
          <span className="jump">Items</span>

          <div className="inp">
            <span className="label">Date Needed</span>
            <input
              type="date"
              className={`w100p border-inp ${
                hasError && !orderData.requested_date && "has-error"
              }`}
              value={orderData.requested_date}
              onChange={(e) => updateForm("requested_date", e.target.value)}
            />
          </div>
        </div>
        <p className="upload">
          <span>Upload product Picture</span>
          <button className="white-btn" disabled={uploadingImage}>
            <input
              onChange={(e) => {
                let file = e.target.files[0];
                uploadPhoto(file);
              }}
              type="file"
              name=""
              id=""
            />
            <span>{uploadingImage ? "Uploading..." : "Add file"}</span>
          </button>
          <br />
          <button
            disabled={uploadingImage}
            onClick={addToCart}
            className="main-btn"
          >
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
                <div className="img">
                  <img
                    src={`${mainUrl}/image/${item.picture[0].path}`}
                    alt=""
                  />
                </div>
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
              <div className="date">{item.requested_date}</div>
            </div>
          );
        })}
        {cart.length ? (
          <>
            <div className="sub-footer">
              <div className="item"></div>
              <div className="qty">
                <p>Total items</p>
                <p>Tax</p>
                <p>Sourcing fee</p>
              </div>
              <div className="date">
                <p>
                  {cart.reduce((sum, item) => {
                    sum += parseFloat(item.quantity);
                    return sum;
                  }, 0)}{" "}
                  Item(s)
                </p>
                <p>
                  --- <span className="grey">NGN</span>
                </p>
                <p>
                  {(cart.length * 300).toLocaleString()}{" "}
                  <span className="grey">NGN</span>
                </p>
              </div>
            </div>
            <div className="footer">
              <div className="item"></div>
              <div className="qty">GRAND TOTAL</div>
              <div className="date">
                <b>{(cart.length * 300).toLocaleString()} NGN</b>{" "}
                <span className="grey">NGN</span>
              </div>
            </div>
          </>
        ) : (
          <p>There are no items in your cart</p>
        )}
      </div>
      {cart.length ? (
        <div className="t-right mb60">
          <button
            style={{
              position: loading ? "relative" : "",
              top: loading ? "-13px" : "",
            }}
            className="bd-btn"
          >
            Save
          </button>
          <button onClick={() => checkout()} className="main-btn ml15">
            {loading ? <Loader /> : "Checkout"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
