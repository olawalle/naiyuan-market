import React from "react";
import "./SourceProducts.scss";

import screen from "../../../assets/screen.png";

export default function SourceProducts() {
  return (
    <div className="source-products">
      <p className="header">Product Sourcing</p>
      <div className="top gradient">
        <div className="half">
          <div className="inp">
            <span className="label">Description</span>
            <textarea
              className="border-inp"
              name=""
              id=""
              cols="20"
              rows="8"
            ></textarea>
          </div>
        </div>
        <div className="half">
          <div className="inp small">
            <span className="label">Quantity</span>
            <input className="border-inp" type="text" />
          </div>
          <span className="jump">Items</span>

          <div className="inp">
            <span className="label">Quantity</span>
            <input className="border-inp" type="text" />
          </div>
        </div>
        <p className="upload">
          <span>Upload product Picture</span>
          <button className="white-btn">Add file</button>
          <br />
          <button className="main-btn">Add to cart</button>
        </p>{" "}
      </div>
      <div className="btm">
        <p className="heading">Uploads</p>
        <div className="header">
          <div className="item">Item</div>
          <div className="qty">Quantity</div>
          <div className="date">Date Needed</div>
        </div>
        {[1, 2, 3, 4, 5, 6].map((n) => {
          return (
            <div key={`item${n}`} className="item-details">
              <div className="item">
                <img src={screen} alt="" className="img" />
                <div className="details">
                  <p className="name">Dell XP Laptop</p>
                  <p className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates doloribus iure earum blanditiis libero, aliquid
                  </p>
                  <div className="btns">
                    <button className="main-btn">Delete</button>
                    <button className="bd-btn ml15">Save for later</button>
                  </div>
                </div>
              </div>
              <div className="qty">
                <div className="inp w40p">
                  <input type="text" className="border-inp" />
                </div>
              </div>
              <div className="date">20/12/10</div>
            </div>
          );
        })}
        <div className="sub-footer">
          <div className="item"></div>
          <div className="qty">
            <p>Total items</p>
            <p>Tax</p>
            <p>Sourcing fee</p>
          </div>
          <div className="date">
            <p>6 Items</p>
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
      </div>
    </div>
  );
}
