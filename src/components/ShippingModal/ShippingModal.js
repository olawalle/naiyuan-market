import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import "./ShippingModal.scss";
import apiServices from "../../services/apiServices";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../loader/Loader";
import { useContext } from "react";
import { appContext } from "../../store/appContext";

export const AddAddress = ({ showBack, setopen, setAddinNew }) => {
  const context = useContext(appContext);
  const { saveAddresses } = context;
  const [loading, setLoading] = useState(false);
  const [newAddress, setAddress] = useState({
    first_name: "",
    last_name: "",
    address: "",
    mobile_number: "",
    country: "",
  });
  const [hasError, sethasError] = useState(false);
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  const saveAddress = () => {
    console.log(newAddress);
    let { first_name, last_name, address, mobile_number, country } = newAddress;
    if (!first_name || !last_name || !address || !mobile_number || !country) {
      sethasError(true);
      return;
    }
    setLoading(true);
    apiServices
      .addAddress(newAddress)
      .then((res) => {
        console.log(res);
        openSnackbar("Address saved successfully", 5000);
        showBack ? setAddinNew(false) : setopen(false);
        setLoading(false);
        apiServices
          .getAddresses()
          .then((res) => {
            saveAddresses(res.data.addresses.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="shipping-modal gradient">
      <div className="heading t-center mb20">Add New Address</div>
      <div className="half f-left">
        <div className="inp">
          <div className="label">First Name</div>
          <input
            type="text"
            className={`border-inp ${
              hasError && !newAddress.first_name && "has-error"
            }`}
            onChange={(e) =>
              setAddress({ ...newAddress, first_name: e.target.value })
            }
          />
        </div>
      </div>
      <div className="half f-right">
        <div className="inp">
          <div className="label">Last Name</div>
          <input
            type="text"
            className={`border-inp ${
              hasError && !newAddress.last_name && "has-error"
            }`}
            onChange={(e) =>
              setAddress({ ...newAddress, last_name: e.target.value })
            }
          />
        </div>
      </div>
      <div className="">
        <div className="inp">
          <div className="label">Phone Number</div>
          <input
            type="text"
            className={`border-inp ${
              hasError && !newAddress.mobile_number && "has-error"
            }`}
            onChange={(e) =>
              setAddress({ ...newAddress, mobile_number: e.target.value })
            }
          />
        </div>
      </div>
      <div className="">
        <div className="inp">
          <div className="label">Full Address</div>
          <textarea
            rows={5}
            type="text"
            style={{ height: "auto" }}
            className={`border-inp ${
              hasError && !newAddress.address && "has-error"
            }`}
            onChange={(e) =>
              setAddress({ ...newAddress, address: e.target.value })
            }
          />
        </div>
      </div>
      <div className="">
        <div className="inp">
          <div className="label">Country/Region</div>
          <input
            type="text"
            className={`border-inp ${
              hasError && !newAddress.country && "has-error"
            }`}
            onChange={(e) =>
              setAddress({ ...newAddress, country: e.target.value })
            }
          />
        </div>
      </div>
      <div className="t-right">
        {showBack && (
          <button className="white-btn mr12" onClick={() => setAddinNew(false)}>
            Back
          </button>
        )}
        <button className="main-btn" onClick={saveAddress}>
          {loading ? <Loader /> : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default function ShippingModal({
  isOpen,
  onCloseModal,
  orders,
  pickedItems,
}) {
  const context = useContext(appContext);
  const { addresses, saveUserShippings, shippingTypes } = context;

  const [open, setopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addingNew, setAddinNew] = useState(false);
  const [shipping_id, setsetShipping] = useState("");

  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  useEffect(() => {
    setopen(isOpen);
    console.log(addresses);
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
      address_id: addresses[0].id,
      cost: picked.reduce((sum, itm) => (sum += parseFloat(itm.total)), 0),
      orders: JSON.stringify(picked),
      shipping_id,
      weight: "unset",
    };
    setLoading(true);
    console.log(data);
    apiServices
      .uploadShipping(data)
      .then((res) => {
        setLoading(false);
        onCloseModal();
        openSnackbar("Shipping request sent successfully", 5000);
        apiServices
          .getUserShippings()
          .then((res) => {
            console.log(res);
            saveUserShippings(res.data.usershippings.data);
          })
          .catch((err) => {
            console.log(err);
          });
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
                onChange={(e) => setsetShipping(e.target.value)}
                name=""
                id=""
              >
                <option value=""></option>
                {shippingTypes.map((type) => (
                  <option value={type.id}>{type.name}</option>
                ))}
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
                  {addresses.length ? (
                    <div className="address">
                      <p>
                        <b>Receiver:</b> {addresses[0].last_name}{" "}
                        {addresses[0].first_name}
                      </p>
                      <p>
                        <b>Address:</b> {addresses[0].address}
                      </p>
                      <p>
                        <b>Phone Number:</b> {addresses[0].mobile_number}
                      </p>
                    </div>
                  ) : (
                    <p>No addresses saved</p>
                  )}
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
          <AddAddress
            showBack={true}
            setAddinNew={setAddinNew}
            setopen={setopen}
          />
        )}
      </Modal>
    </div>
  );
}
