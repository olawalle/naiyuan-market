import React, { useState } from "react";
import "./Home.scss";

import badge from "../../../assets/Image.svg";
import screen from "../../../assets/screen.png";
import ShippingModal from "../../../components/ShippingModal/ShippingModal";

export default function Shipping() {
  const [open, setopen] = useState(false);

  const onCloseModal = () => {
    setopen(false);
  };

  return (
    <div className="home">
      <div className="wide">
        <div className="btm-section pt0">
          <p>My Packages</p>
          <table className="main-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" /> Item
                </th>
                <th>Supplier</th>
                <th>Qty</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 9].map((row, i) => (
                <tr key={`row${i}`}>
                  <td style={{ width: "40%" }}>
                    <input type="checkbox" name="" id="" />
                    <span className="no"></span>
                    Deskjet Printers
                    <img
                      src={screen}
                      style={{
                        float: "right",
                        // marginRight: "30px",
                        // marginTop: "15px",
                      }}
                      alt=""
                    />
                  </td>
                  <td>Hp</td>
                  <td>
                    <div
                      className={`dot ${
                        !(i % 2)
                          ? "bg-yellow"
                          : !(i % 3)
                          ? "bg-red"
                          : "bg-green"
                      }`}
                    ></div>
                    Shipped
                  </td>
                  <td>$12,100.00</td>
                </tr>
              ))}

              <tr style={{ border: 0 }}>
                <td
                  colSpan={4}
                  className="t-right pr20"
                  style={{ height: "200px" }}
                >
                  <button className="main-btn" onClick={() => setopen(true)}>
                    Ship
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="narrow mt20">
        <img className="badge" src={badge} alt="" />
      </div>

      <ShippingModal isOpen={open} onCloseModal={onCloseModal} />
    </div>
  );
}
