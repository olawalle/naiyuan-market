import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import "./ShippingModal.scss";
import apiServices from "../../services/apiServices";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../loader/Loader";

export default function ShippingModal({
  isOpen,
  onCloseModal,
  orders,
  pickedItems,
}) {
  const [open, setopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addingNew, setAddinNew] = useState(false);
  const [newAddress, setnewAddress] = useState({
    state: "",
    city: "",
    address_line_1: "",
    pobox_number: "",
  });
  const [shipper, setShipper] = useState("");
  const [address, setAddress] = useState({
    first_name: "John",
    last_name: "Doe",
    address: "No 1, no lane street. Lagos",
    phone: "+123409867655",
    country: "Nigeria",
  });
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  useEffect(() => {
    setopen(isOpen);
  }, [isOpen]);

  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const sendShipping = () => {
    let picked = orders
      .map((ord, i) => {
        return pickedItems.includes(i) ? ord : null;
      })
      .filter((n) => n);
    let data = {
      address_id: 4,
      cost: picked.reduce((sum, itm) => (sum += parseFloat(itm.total)), 0),
      orders: JSON.stringify(picked),
      shipping_id: makeid(12),
      weight: "unset",
    };
    setLoading(true);
    console.log(data);
    apiServices
      .uploadShipping(data)
      .then((res) => {
        setLoading(false);
        onCloseModal();
        console.log(res);
        openSnackbar("Shipping request sent successfully", 5000);
      })
      .catch((err) => {
        setLoading(false);
        console.log({ err });
      });
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        {!addingNew ? (
          <div className="shipping-modal gradient">
            <div className="heading">Shipping Details</div>
            <div className="inp">
              <div className="label">Select Shipper</div>
              <select
                onChange={(e) => setShipper(e.target.value)}
                name=""
                id=""
              >
                <option value=""></option>
                <option value="DHL">DHL</option>
                <option value="UPS">UPS</option>
              </select>
            </div>

            <div className="addresses">
              <div className="sm-heading">Shipping Address</div>
              <div className="add-new" onClick={() => setAddinNew(true)}>
                {" "}
                <span className="plus">+</span> ADD A NEW ADDRESS
              </div>
              <div className="default">
                <div className="title">Default Address</div>
                <div className="text">
                  <div className="indicator">
                    <span className="plus">+</span>
                  </div>
                  <div className="address">
                    <p>
                      <b>Receiver:</b> Mr Eric
                    </p>
                    <p>
                      <b>Address:</b> lorem ipsum dolor sit amet
                    </p>
                    <p>
                      <b>Phone Number:</b> +234 8098 233 1234
                    </p>
                  </div>
                </div>
              </div>
              <div className="t-right">
                <button className="main-btn" onClick={sendShipping}>
                  {loading ? <Loader /> : "Continue"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="shipping-modal gradient">
            <div className="heading t-center mb20">Add New Address</div>
            <div className="half f-left">
              <div className="inp">
                <div className="label">First Name</div>
                <input type="text" className="border-inp" />
              </div>
            </div>
            <div className="half f-right">
              <div className="inp">
                <div className="label">Last Name</div>
                <input type="text" className="border-inp" />
              </div>
            </div>
            <div className="">
              <div className="inp">
                <div className="label">Phone Number</div>
                <input type="text" className="border-inp" />
              </div>
            </div>
            <div className="">
              <div className="inp">
                <div className="label">Full Address</div>
                <textarea rows={10} type="text" />
              </div>
            </div>
            <div className="">
              <div className="inp">
                <div className="label">Country/Region</div>
                <input type="text" className="border-inp" />
              </div>
            </div>
            <div className="t-right">
              <button
                className="white-btn mr12"
                onClick={() => setAddinNew(false)}
              >
                Back
              </button>
              <button className="main-btn">Continue</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
