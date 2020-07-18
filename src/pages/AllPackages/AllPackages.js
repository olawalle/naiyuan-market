import React from "react";
import "./AllPackages.scss";
import Nav from "../../components/Nav/Nav";
import { withRouter } from "react-router-dom";
import ShippingModal from "../../components/ShippingModal/ShippingModal";
import { useState } from "react";
export default withRouter(function AllPackages({ history }) {
  const [open, setopen] = useState(false);

  const onCloseModal = () => {
    setopen(false);
  };

  const toDash = () => {
    history.push("/dashboard/");
  };
  return (
    <div className="all-packages">
      <Nav showLogo={true} />
      <div className="header">
        <div className="left t-left">
          <span onClick={toDash} className="light pointer">
            Dashboard
          </span>
          <span className="thick">My Packages</span>
        </div>
        <div className="right t-right">
          <input type="text" />
          <select className="mid" name="" id="">
            <option value=""></option>
          </select>
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
      </div>

      <div className="gradient">
        <table className="white-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="" id="" /> Item
              </th>
              <th>Quantity</th>
              <th>Tracking no.</th>
              <th>Shipping Fee</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 9].map((row, i) => (
              <tr key={`row${i}`}>
                <td>
                  <input type="checkbox" name="" id="" />
                  Cheese
                </td>
                <td>Ali express</td>
                <td>1434</td>
                <td>
                  <b>3,200.00</b>USD
                </td>
                <td>
                  <div
                    className={`dot ${
                      !(i % 2) ? "bg-yellow" : !(i % 3) ? "bg-red" : "bg-green"
                    }`}
                  ></div>{" "}
                  <span className="pr10">Delivered</span>
                  <select
                    name=""
                    id=""
                    className="pl12 bd-input"
                    style={{
                      height: "25px",
                      width: "60px",
                      border: "1px solid #dfdfdf",
                      borderRadius: "4px",
                    }}
                  >
                    <option value=""></option>
                  </select>
                </td>
              </tr>
            ))}
            <tr style={{ border: 0 }}>
              <td
                colSpan={5}
                className="t-right pr20"
                style={{ height: "200px" }}
              >
                <button className="white-btn mr15">Quality Check</button>
                <button className="main-btn" onClick={() => setopen(true)}>
                  Ship
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ShippingModal isOpen={open} onCloseModal={onCloseModal} />
    </div>
  );
});
