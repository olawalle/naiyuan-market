import React, { useState } from "react";
import "./PaySupplier.scss";
import apiServices from "../../../services/apiServices";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../../components/loader/Loader";
import { useContext } from "react";
import { appContext } from "../../../store/appContext";

export default function PaySuppier() {
  const context = useContext(appContext);
  const { updateUser, setTnx } = context;
  const [hasError, sethasError] = useState(false);
  const [loading, setloading] = useState(false);
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [paymentData, setpaymentData] = useState({
    payment_method: "",
    payment_name: "",
    payment_description: "",
    amount: "",
  });

  const updateForm = (key, value) => {
    let data = {
      ...paymentData,
    };
    data[key] = value;
    setpaymentData(data);
  };

  const sendPayment = () => {
    const {
      payment_method,
      payment_name,
      payment_description,
      amount,
    } = paymentData;
    let data = {
      payment_method,
      payment_name,
      payment_description,
      amount,
    };
    if (!payment_description || !payment_method || !payment_name || !amount) {
      sethasError(true);
      return;
    }
    setloading(true);
    apiServices
      .postPayment(data)
      .then((res) => {
        setloading(false);
        openSnackbar("Payment sent sucessfully", 5000);
        setpaymentData({
          payment_method: "",
          payment_name: "",
          payment_description: "",
          amount: "",
        });
        fetchUser();
        getTransactions();
      })
      .catch((err) => {
        console.log({ err });
        setloading(false);
        openSnackbar(
          err.response.data.error.message || "An error occured",
          5000
        );
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

  const getTransactions = () => {
    apiServices
      .getTnxs()
      .then((tnx) => {
        setTnx(tnx.data.transactions.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pay-supplier">
      <div className="header">Pay Supplier</div>

      <div className="gradient w100p mt30">
        <div className="roww">
          <div className="label">Amount</div>
          <div className="inp">
            <input
              type="number"
              className={`border-inp w100p ${
                hasError && !paymentData.amount && "has-error"
              }`}
              defaultValue={paymentData.amount}
              value={paymentData.amount}
              onChange={(e) => {
                updateForm("amount", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="roww">
          <div className="label">Payment Method</div>
          <div className="inp">
            <select
              type="text"
              className={`border-inp w100p ${
                hasError && !paymentData.payment_method && "has-error"
              }`}
              defaultValue={paymentData.payment_method}
              value={paymentData.payment_method}
              onChange={(e) => {
                updateForm("payment_method", e.target.value);
              }}
            >
              <option value="">WeChat, Bank transfer.</option>
              <option value="Alipay">Alipay</option>
              <option value="WeChat">WeChat</option>
              <option value="Bank transter">Bank Transfer</option>
            </select>
          </div>
        </div>
        <div className="roww">
          <div className="label">Receiver's Name</div>
          <div className="inp">
            <input
              type="text"
              className={`border-inp w100p ${
                hasError && !paymentData.payment_method && "has-error"
              }`}
              defaultValue={paymentData.payment_name}
              value={paymentData.payment_name}
              onChange={(e) => {
                updateForm("payment_name", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="roww">
          <div className="label">Payment Description</div>
          <div className="inp">
            <textarea
              type="text"
              rows="20px"
              className={`border-inp w100p ${
                hasError && !paymentData.payment_description && "has-error"
              }`}
              defaultValue={paymentData.payment_description}
              value={paymentData.payment_description}
              onChange={(e) => {
                updateForm("payment_description", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="roww t-right">
          <button className="main-btn mt12" onClick={sendPayment}>
            {loading ? <Loader /> : "Make Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
