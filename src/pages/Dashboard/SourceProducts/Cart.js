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

export default withRouter(function Cart({ history }) {
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
    updateUserCart,
    userCart,
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
  const [open, setopen] = useState(false);
  const [userCart_, setuserCart_] = useState([]);

  useEffect(() => {
    fetchCart();
    setuserCart_(userCart);
  }, []);

  const onCloseModal = () => {
    setopen(false);
  };

  const updateAmount = (val, i) => {
    setuserCart_(
      userCart_.map((itm, j) => {
        return i === j
          ? {
              ...itm,
              quantity: val,
            }
          : itm;
      })
    );
  };

  const fetchCart = (i) => {
    apiServices.getUserCart().then((res) => {
      console.log(res);
      updateUserCart(res.data);
    });
  };

  const handleOrderPost = () => {
    let count = 0;
    setloading(true);
    userCart.map((data, i) => {
      const {
        link,
        website_id,
        quantity,
        description,
        amount,
        picture_url,
        cart_name,
      } = data;
      let payload = {
        link,
        website_id,
        quantity,
        description,
        amount,
        picture_url,
        order_name: cart_name,
        total: parseFloat(quantity) * parseFloat(amount) * dollarRate(),
      };
      apiServices
        .postOrder(payload)
        .then((res) => {
          setloading(false);
          setopen(false);
          count = 0 ? openSnackbar("Order placed sucessfully", 5000) : null;
          history.push("/dashboard/order-history");
          deleteItem(i, false);
          fetchOrders();
          fetchUser();
        })
        .catch((err) => {
          console.log({ err });
          openSnackbar(
            err.response ? err.response.data.error.message : "An error occured",
            5000
          );
          setloading(false);
        });
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

  const deleteItem = (i, noAlert) => {
    apiServices
      .deleteFromCart(userCart[i].id)
      .then((res) => {
        setloading(false);
        setopen(false);
        noAlert && openSnackbar("Item deleted sucessfully", 5000);
      })
      .catch((err) => {
        console.log({ err });
        openSnackbar(
          err.response ? err.response.data.error.message : "An error occured",
          5000
        );
        setloading(false);
      });
  };

  const dollarRate = () => {
    let naira_dollar = rates.find((r) => r.pair === "Naira/Dollar");
    let oneDollar = naira_dollar ? parseFloat(naira_dollar.rate) : 0;
    return oneDollar;
  };

  const orderTotal = () => {
    let amtTotal = userCart.reduce(
      (sum, order) =>
        (sum += order.amount * dollarRate() * parseFloat(order.quantity)),
      0
    );
    let fee = 300;
    // userCart.reduce((sum, item) => {
    //   sum += parseFloat(item.quantity);
    //   return sum;
    // }, 0) * 300;

    return amtTotal + fee;
  };

  return (
    <div className="source-products">
      <Modal open={open} onClose={onCloseModal} center>
        <div className="gradient t-center o-hidden placement-modal">
          <p className="heading ">Make payment</p>
          <p className="amount mt55">
            <span className="title">Total Amount</span>
            <span className="amt">NGN {orderTotal().toLocaleString()}</span>
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

      <p className="header">Cart</p>

      <div className="btm">
        <div className="header">
          <div className="item">Item</div>
          <div className="qty">Quantity</div>
          <div className="date">Amount</div>
        </div>
        {userCart_.map((item, i) => {
          return (
            <div key={`item${i}`} className="item-details">
              <div className="item">
                <div className="img">
                  <img src={item.picture_url} alt="" />
                </div>
                <div className="details">
                  <p className="name">{item.cart_name || "---"}</p>
                  <p className="desc">{item.description}</p>
                  <div className="btns">
                    <button
                      onClick={() => deleteItem(i, true)}
                      className="main-btn"
                    >
                      {loading ? <Loader /> : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="qty">
                <div className="inp w40p">
                  <input
                    defaultValue={item.quantity}
                    type="text"
                    className="border-inp"
                    onChange={(e) => updateAmount(e.target.value, i)}
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
        {userCart.length ? (
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
                  {userCart.reduce((sum, item) => {
                    sum += parseFloat(item.quantity);
                    return sum;
                  }, 0)}{" "}
                  Item(s)
                </p>
                <p>
                  --- <span className="grey">USD</span>
                </p>
                <p>
                  300.00 <span className="grey">NGN</span>
                </p>
              </div>
            </div>

            <div className="footer">
              <div className="item"></div>
              <div className="qty">GRAND TOTAL</div>
              <div className="date">
                <b>{orderTotal().toLocaleString()}</b>{" "}
                <span className="grey">NGN</span>
              </div>
            </div>
          </>
        ) : (
          <p>There are no items in your cart</p>
        )}
      </div>
      {userCart.length ? (
        <div className="t-right mb60">
          <button onClick={() => setopen(true)} className="main-btn ml15">
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );
});
