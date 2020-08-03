import React, { useState, useContext, useEffect } from "react";
import "./SourceProducts.scss";

import screen from "../../../assets/screen.png";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { mainUrl } from "../../../services/urls";
import Loader from "../../../components/loader/Loader";
import { useSnackbar } from "react-simple-snackbar";
import Modal from "react-responsive-modal";
import { withRouter } from "react-router-dom";

export default withRouter(function OrderPlacement({ history }) {
  const context = useContext(appContext);
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const {
    updateCart,
    removeItem,
    cart,
    clearCart,
    orders,
    websites,
    saveOrders,
  } = context;
  const [orderData, setorderData] = useState({
    link: "",
    website_id: null,
    quantity: "",
    description: "",
    amount: "",
    picture_url: "",
  });
  const [hasError, sethasError] = useState(false);
  const [loading, setloading] = useState(false);
  const [uploadingImage, setuploadingImage] = useState(false);
  const [newOrder, setnewOrder] = useState([]);
  const [open, setopen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const onCloseModal = () => {
    setopen(false);
  };

  const addToCart = (data) => {
    const { quantity, description, link, website_id, picture_url } = data;
    if (!quantity || !description || !link || !website_id) {
      sethasError(true);
      return;
    }
    setnewOrder([...newOrder, data]);
  };

  const handleOrderPost = () => {
    setloading(true);
    newOrder.map((data) => {
      apiServices
        .postOrder(data)
        .then((res) => {
          setloading(false);
          setopen(false);
          openSnackbar("Order placed sucessfully", 5000);
          history.push("/dashboard/order-history");
          fetchOrders();
        })
        .catch((err) => {
          console.log({ err });
          setloading(false);
        });
    });
  };

  const fetchOrders = () => {
    apiServices
      .getOrders()
      .then((orders) => {
        saveOrders(orders.data.orders.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const getProductDetails = () => {
    let data = {
      url: orderData.link,
    };
    setloading(true);
    apiServices
      .getLinkDetails(data)
      .then((res) => {
        console.log(res);
        let pic = res.data.find((itm) => itm.property === "og:image");
        let amt = res.data.find(
          (itm) => itm.property === "og:price:standard_amount"
        );
        let picture_url = pic ? pic.content : "";
        let amount = amt ? amt.content : "";
        let order = { ...orderData, picture_url, amount };
        setorderData(order);
        addToCart(order);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
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
    setnewOrder(newOrder.filter((o, j) => j !== i));
  };

  const orderTotal = () => {
    return newOrder.reduce(
      (sum, order) => (sum += parseFloat(order.amount)),
      0
    );
  };

  useEffect(() => {}, []);

  return (
    <div className="source-products">
      <Modal open={open} onClose={onCloseModal} center>
        <div className="gradient t-center o-hidden placement-modal">
          <p className="heading ">Make payment</p>
          <p className="amount mt55">
            <span className="title">Total Amount</span>
            <span className="amt">$ {orderTotal().toLocaleString()}</span>
          </p>
          <div className="form w100p mt12">
            <div className="inp w100p">
              <select className="border-inp w100p" name="" id="">
                <option value="">Select Payment method</option>
                <option value="Pay from wallet">Pay from wallet</option>
              </select>
            </div>
            <button className="main-btn w100p" onClick={handleOrderPost}>
              {loading ? <Loader /> : "Continue"}
            </button>
          </div>
        </div>
      </Modal>

      <p className="header">Order Placement</p>
      <div className="top gradient">
        <div className="w100p mb20">
          <div className="inp side-label small">
            <span className="label">Sourcing Webiste</span>
            <select
              type="text"
              className={`field border-inp ${
                hasError && !orderData.website_id && "has-error"
              }`}
              defaultValue={orderData.website_id}
              value={orderData.website_id}
              onChange={(e) => {
                updateForm("website_id", e.target.value);
              }}
            >
              <option value={null}>Select a website</option>
              {websites.map((website) => (
                <option key={website.link} value={website.id}>
                  {website.link}
                </option>
              ))}
            </select>
          </div>
          <div className="inp side-label small">
            <span className="label">Product Link</span>
            <input
              type="text"
              className={`field border-inp ${
                hasError && !orderData.link && "has-error"
              }`}
              value={orderData.link}
              onChange={(e) => updateForm("link", e.target.value)}
            />
          </div>
          <div className="inp side-label small">
            <span className="label">Quantity</span>
            <input
              type="text"
              style={{ width: "100px" }}
              className={`field border-inp ${
                hasError && !orderData.quantity && "has-error"
              }`}
              value={orderData.quantity}
              onChange={(e) => updateForm("quantity", e.target.value)}
            />{" "}
            <span>Items</span>
          </div>
          <div className="inp side-label small">
            <span className="label">Product Description (optional)</span>
            <textarea
              name=""
              id=""
              cols="20"
              rows="8"
              className={`field border-inp ${
                hasError && !orderData.description && "has-error"
              }`}
              value={orderData.description}
              onChange={(e) => updateForm("description", e.target.value)}
            ></textarea>
          </div>

          <div className="inp side-label small">
            <span style={{ opacity: 0 }} className="label">
              .
            </span>
            <button onClick={getProductDetails} className="main-btn">
              {loading ? <Loader /> : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      <div className="btm">
        <p className="heading">Uploads</p>
        <div className="header">
          <div className="item">Item</div>
          <div className="qty">Quantity</div>
          <div className="date">Amount</div>
        </div>
        {newOrder.map((item, i) => {
          return (
            <div key={`item${i}`} className="item-details">
              <div className="item">
                <div className="img">
                  <img src={item.picture_url} alt="" />
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
              <div className="date">{item.amount}</div>
            </div>
          );
        })}
        {newOrder.length ? (
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
                  {newOrder.reduce((sum, item) => {
                    sum += parseFloat(item.quantity);
                    return sum;
                  }, 0)}{" "}
                  Item(s)
                </p>
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
          </>
        ) : (
          <p>There are no items in your cart</p>
        )}
      </div>
      {newOrder.length ? (
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
          <button onClick={() => setopen(true)} className="main-btn ml15">
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );
});
