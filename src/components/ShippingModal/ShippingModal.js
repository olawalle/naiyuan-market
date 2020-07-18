import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import "./ShippingModal.scss";

export default function ShippingModal({ isOpen, onCloseModal }) {
  const [open, setopen] = useState(false);

  useEffect(() => {
    setopen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="shipping-modal gradient">
          <div className="heading">Shipping Details</div>
          <div className="inp">
            <div className="label">Select Shipper</div>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>

          <div className="addresses">
            <div className="sm-heading">Shipping Address</div>
            <div className="add-new">ADD A NEW ADDRESS</div>
            <div className="default">
              <div className="title">Default Address</div>
              <div className="text">
                <div className="indicator">+</div>
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
          </div>
        </div>
      </Modal>
    </div>
  );
}
