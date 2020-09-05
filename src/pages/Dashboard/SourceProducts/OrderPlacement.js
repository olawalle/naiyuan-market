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
    updateUser,
    websites,
    saveOrders,
    rates,
    userCart,
    updateUserCart,
  } = context;
  const [orderData, setorderData] = useState({
    link: "",
    website_id: "",
    quantity: "",
    description: "",
    amount: "",
    picture_url: "",
    order_name: "",
  });
  const [hasError, sethasError] = useState(false);
  const [loading, setloading] = useState(false);
  const [loading_, setloading_] = useState(false);
  const [uploadingImage, setuploadingImage] = useState(false);
  const [newOrder, setnewOrder] = useState([]);
  const [open, setopen] = useState(false);
  const [count, setcount] = useState(0);
  const [userCart_, setuserCart_] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchOrders();
    setuserCart_(userCart);
  }, [selectedItems, userCart]);

  const onCloseModal = () => {
    setopen(false);
  };

  const addToCart = (data) => {
    setloading_(true);
    apiServices
      .addToCart({ ...data, cart_name: data.order_name })
      .then((res) => {
        setloading_(false);
        openSnackbar("Item added to cart", 5000);
        apiServices.getUserCart().then((res) => {
          console.log(res);
          updateUserCart(res.data);
        });
      })
      .catch((err) => {
        setloading_(false);
        console.log(err);
      });
  };

  const addToList = (data) => {
    const { quantity, description, link, website_id, picture_url } = data;
    if (!quantity || !description || !link || !website_id) {
      sethasError(true);
      return;
    }
    setnewOrder([...newOrder, data]);
  };

  const handleOrderPost = () => {
    setloading(true);
    let payload = {
      carts: selectedItems,
      total: parseFloat(orderTotal()),
    };
    console.log(payload);
    apiServices
      .postOrder(payload)
      .then((res) => {
        setloading(false);
        setopen(false);
        openSnackbar("Order placed sucessfully", 5000);
        history.push("/dashboard/order-history");
        fetchOrders();
        fetchUser();
      })
      .catch((err) => {
        console.log({ err });
        openSnackbar(err.response.data.error.message, 5000);
        setloading(false);
      });
  };

  const fetchUser = () => {
    apiServices
      .getCurrentUser()
      .then((res) => {
        updateUser(res.data);
      })
      .catch((err) => {
        console.log({ err });
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
    const { quantity, description, link, website_id } = orderData;
    if (!quantity || !description || !link || !website_id) {
      sethasError(true);
      return;
    }
    let selectedSite = websites.find(
      (s) => s.id === parseFloat(orderData.website_id)
    ).name;
    let n = selectedSite === "Alibaba" ? 1 : 2;
    let data = {};
    if (n === 1) {
      data = {
        url: orderData.link,
      };
    } else {
      data = {
        id: orderData.link.split("/offer/")[1].split(".")[0],
      };
    }
    setloading(true);
    apiServices
      .getLinkDetails(data, n)
      .then((res) => {
        console.log(res);
        if (n === 1) {
          let pic = res.data.find((itm) => itm.property === "og:image");
          let amt = res.data.find(
            (itm) => itm.property === "og:price:standard_amount"
          );
          let name_ = res.data.find((itm) => itm.property === "og:title");
          let picture_url = pic ? pic.content : "";
          let amount = amt ? amt.content : "";
          let order_name = amt ? name_.content : "";
          let order = { ...orderData, picture_url, amount, order_name };
          // setorderData(order);
          addToCart(order);
        } else {
          let picture_url = res.data.item.pic_url;
          let amount = res.data.item.price * yuanRate(); // in dollars
          let order_name = res.data.item.title;
          let order = { ...orderData, picture_url, amount, order_name };
          // setorderData(order);
          addToCart(order);
        }
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
    apiServices
      .deleteFromCart(userCart_[i].id)
      .then((res) => {
        openSnackbar("Item deleted from cart", 5000);
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        openSnackbar(
          err.response.data.error.message || "An error occured",
          5000
        );
      });
  };

  /**
   * exchange rate of one dollar to naira
   */
  const dollarRate = () => {
    let naira_dollar = rates.find((r) => r.pair === "Naira/Dollar");
    let oneDollar = naira_dollar
      ? parseFloat(naira_dollar.rate.split("/")[0])
      : 0;
    return oneDollar;
  };

  /**
   * exchange rate of one dollar to yuan
   */
  const yuanRate = () => {
    let naira_dollar = rates.find((r) => r.pair === "Naira/Dollar");
    let naira_yuan = rates.find((r) => r.pair === "Naira/Yuan");
    let oneDollar = naira_dollar
      ? parseFloat(naira_dollar.rate.split("/")[0])
      : 0;
    let oneYuan = naira_yuan ? parseFloat(naira_yuan.rate.split("/")[0]) : 0;
    let dollar_yuan_rate = oneDollar / oneYuan;
    return dollar_yuan_rate;
  };

  const orderTotal = () => {
    let pickedCartItemsData = selectedItems.map((itm) =>
      userCart_.find((cartItm) => cartItm.id === itm)
    );
    let amtTotal =
      pickedCartItemsData.reduce((sum, item) => (sum += item.total), 0) *
      dollarRate();
    let fee = amtTotal * 0.05;
    return (amtTotal + fee).toFixed(2);
  };

  return (
    <div className="source-products">
      <Modal open={open} onClose={onCloseModal} center>
        <div className="gradient t-center o-hidden placement-modal">
          <p className="heading ">Make payment</p>
          <p className="amount mt55">
            <span className="title">
              Total Amount + 5% Procurement fee(
              {(parseFloat(orderTotal()) * 0.05).toLocaleString()})
            </span>
            <span className="amt">
              NGN {parseFloat(orderTotal()).toLocaleString()}
            </span>
          </p>
          <div className="form w100p mt16">
            <div className="inp w100p">
              <select className="border-inp w100p" name="" id="">
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
            <span className="count">Items</span>
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
          <div className="item">
            Item
            <label
              class="custom-checkbox"
              style={{ float: "left", marginRight: 12 }}
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  e.target.checked
                    ? setSelectedItems(userCart_.map((itm) => itm.id))
                    : setSelectedItems([])
                }
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <div className="qty">Quantity</div>
          <div className="date">Amount</div>
        </div>
        {userCart_.map((item, i) => {
          return (
            <div key={`item${i}`} className="item-details">
              <div className="item">
                <label
                  class="custom-checkbox"
                  style={{ float: "left", marginRight: 12 }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedItems([...selectedItems, item.id])
                        : setSelectedItems(
                            selectedItems.filter((id) => id !== item.id)
                          )
                    }
                  />
                  <span class="checkmark"></span>
                </label>
                <div className="img">
                  <img src={item.picture_url} alt="" />
                </div>
                <div className="details">
                  <p className="name">{item.cart_name || "---"}</p>
                  <p className="desc">{item.description}</p>
                  <div className="btns">
                    <button onClick={() => deleteItem(i)} className="main-btn">
                      Delete
                    </button>
                    {/* <button
                      className="bd-btn ml15"
                      onClick={() => addToCart(i)}
                    >
                      {loading_ ? <Loader /> : "Save for later"}
                    </button> */}
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
              <div className="date">
                NGN{" "}
                {(dollarRate() * item.quantity * item.amount).toLocaleString()}
              </div>
            </div>
          );
        })}
        {userCart_.length ? (
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
                  {userCart_.reduce((sum, item) => {
                    sum += selectedItems.includes(item.id)
                      ? parseFloat(item.quantity)
                      : 0;
                    return sum;
                  }, 0)}{" "}
                  Item(s)
                </p>
                <p>
                  --- <span className="grey">NGN</span>
                </p>
                <p>
                  {(parseFloat(orderTotal()) * 0.05)
                    // .toFixed(2)
                    .toLocaleString()}{" "}
                  <span className="grey">NGN</span>
                </p>
              </div>
            </div>

            <div className="footer">
              <div className="item"></div>
              <div className="qty">GRAND TOTAL</div>
              <div className="date">
                <b>{parseFloat(orderTotal()).toLocaleString()}</b>{" "}
                <span className="grey">NGN</span>
              </div>
            </div>
          </>
        ) : (
          <p>There are no items in your cart</p>
        )}
      </div>
      {userCart_.length ? (
        <div className="t-right mb60">
          {/* <button
            style={{
              position: loading ? "relative" : "",
              top: loading ? "-13px" : "",
            }}
            className="bd-btn"
          >
            Save
          </button> */}
          <button
            onClick={() =>
              selectedItems.length
                ? setopen(true)
                : openSnackbar("Please select an item", 5000)
            }
            className="main-btn ml15"
          >
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );
});
