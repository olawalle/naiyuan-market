import React, { useState } from "react";
import "./Sidebar.scss";

import home from "../../assets/home.svg";
import logo from "../../assets/Logo.svg";
import icon from "../../assets/Icon.svg";

export default function Sidebar({ sideOpen }) {
  const [activeIndex, setactiveIndex] = useState(0);
  const [activeIndex_, setactiveIndex_] = useState(0);
  const [links, setlinks] = useState([
    {
      text: "Dashboard",
      img: home,
    },
    {
      text: "Other Placement",
      img: home,
      children: ["Sources Product", "Order Placement", "Order History"],
    },
    {
      text: "Shipping",
      img: home,
    },
    {
      text: "Pay Supplier",
      img: home,
    },
    {
      text: "Track Order",
      img: home,
    },
    {
      text: "Contact Support",
      img: home,
    },
  ]);
  return (
    <div className="sidebar">
      <div className="top">
        <img src={sideOpen ? logo : icon} alt="" />
      </div>
      <ul>
        {links.map((link, i) => (
          <li className={`pointer`} onClick={() => setactiveIndex(i)}>
            <div
              className={`main-link ${i === activeIndex ? "active-link" : ""}`}
            >
              <img src={link.img} alt="" />
              {sideOpen && <span>{link.text}</span>}
            </div>
            {link.children && (
              <div className={`inner ${i === activeIndex ? "open-inner" : ""}`}>
                {link.children.map((child, i) => {
                  return (
                    <p
                      className={`${
                        i === activeIndex_ ? "active-inner-link" : ""
                      }`}
                      onClick={() => setactiveIndex_(i)}
                    >
                      <div className="circle"></div>
                      {child}
                    </p>
                  );
                })}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
