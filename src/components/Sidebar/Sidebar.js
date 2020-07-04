import React, { useState } from "react";
import "./Sidebar.scss";

import home from "../../assets/home.svg";
import logo from "../../assets/Logo.svg";
import icon from "../../assets/Icon.svg";
import { withRouter } from "react-router-dom";

export default withRouter(function Sidebar({ sideOpen, history, onOpenModal }) {
  const [activeIndex, setactiveIndex] = useState(0);
  const [activeIndex_, setactiveIndex_] = useState(null);
  const [links, setlinks] = useState([
    {
      text: "Dashboard",
      img: home,
      link: "/dashboard/",
    },
    {
      text: "Other Placement",
      img: home,
      children: [
        { text: "Sources Product", link: "/dashboard/source-products" },
        {
          text: "Order Placement",
          link: "/dashboard/order-placement",
        },
        { text: "Order History", link: "/dashboard/order-history" },
      ],
    },
    {
      text: "Wallet",
      img: home,
      children: [
        { text: "My Wallet", link: "/dashboard/my-wallet" },
        {
          text: "Transaction History",
          link: "/dashboard/tnx-history",
        },
        { text: "Currency Calculator", link: "/calculator" },
      ],
    },
    {
      text: "Shipping",
      img: home,
      children: [
        { text: "Shipping", link: "/dashboard/shipping" },
        { text: "Shipping Records", link: "/dashboard/shipping-records" },
      ],
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

  const openChild = (i, j) => {
    setTimeout(() => {
      setactiveIndex_(j);
      let link = links.find((l, k) => k === i).children[j].link;
      if (link === "/dashboard/order-placement") {
        onOpenModal(1);
        return;
      }
      if (link === "/calculator") {
        onOpenModal(2);
        return;
      }
      history.push(link);
    }, 100);
  };

  const goToLink = (i) => {
    let link = links.find((l, k) => k === i).link;
    link && history.push(link);
    setactiveIndex(i);
    setactiveIndex_(null);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img src={sideOpen ? logo : icon} alt="" />
      </div>
      <ul>
        {links.map((link, i) => (
          <li
            key={`link${i}`}
            className={`pointer`}
            onClick={() => goToLink(i)}
          >
            <div
              className={`main-link ${i === activeIndex ? "active-link" : ""}`}
            >
              <img src={link.img} alt="" />
              {sideOpen && <span>{link.text}</span>}
            </div>
            {link.children && (
              <div
                className={`inner`}
                style={{
                  height:
                    i === activeIndex ? `${link.children.length * 45}px` : "0",
                }}
              >
                {link.children.map((child, j) => {
                  return (
                    <div
                      key={`child${i}${j}`}
                      className={`inner-link ${
                        j === activeIndex_ ? "active-inner-link" : ""
                      }`}
                      onClick={() => openChild(i, j)}
                    >
                      <div className="circle"></div>
                      {child.text}
                    </div>
                  );
                })}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});
