import React from "react";
import "./PaySupplier.scss";

export default function PaySuppier() {
  return (
    <div className="pay-supplier">
      <div className="header">Shipping Records</div>

      <div className="gradient w100p mt30">
        <div className="roww">
          <div className="label">Amount</div>
          <div className="inp">
            <input type="text" className="border-inp w100p" />
          </div>
        </div>
        <div className="roww">
          <div className="label">Payment Method</div>
          <div className="inp">
            <input type="text" className="border-inp w100p" />
          </div>
        </div>
        <div className="roww">
          <div className="label">Receiever's Name</div>
          <div className="inp">
            <input type="text" className="border-inp w100p" />
          </div>
        </div>
        <div className="roww">
          <div className="label">Payment Description</div>
          <div className="inp">
            <textarea type="text" rows="20px" className="border-inp w100p" />
          </div>
        </div>
        <div className="roww t-right">
          <button className="main-btn mt12">Make Payment</button>
        </div>
      </div>
    </div>
  );
}
