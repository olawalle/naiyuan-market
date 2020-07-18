import React, { useState } from "react";
import "./Sidebar.scss";

import home from "../../assets/home.svg";
import logo from "../../assets/Logo.svg";
import icon from "../../assets/Icon.svg";
import { withRouter } from "react-router-dom";

export const NavLinks = ({
  onOpenModal,
  history,
  sideOpen,
  closeNav,
  setName,
}) => {
  const [activeIndex, setactiveIndex] = useState(0);
  const [activeIndex_, setactiveIndex_] = useState(null);
  const icons = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="16.683" height="15.908" viewBox="0 0 16.683 15.908"><defs><style>.a{}</style></defs><g transform="translate(0)"><path class="a" d="M74.039,120.939,65.713,128.3a.225.225,0,0,1-.007.046.227.227,0,0,0-.007.046v7.457a.99.99,0,0,0,.275.7.863.863,0,0,0,.652.3h5.561v-5.965h3.708v5.966h5.561a.861.861,0,0,0,.652-.3.99.99,0,0,0,.276-.7V128.4a.232.232,0,0,0-.015-.093Z" transform="translate(-65.698 -120.939)"/></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
    <g id="Group_9613" data-name="Group 9613" transform="translate(-48.849 -239.764)">
      <g id="message-square" transform="translate(49.849 240.764)">
        <path id="Path" d="M15,10a1.667,1.667,0,0,1-1.667,1.667h-10L0,15V1.667A1.667,1.667,0,0,1,1.667,0H13.333A1.667,1.667,0,0,1,15,1.667Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      </g>
    </g>
  </svg>
  `,
    `<svg xmlns="http://www.w3.org/2000/svg" width="18.416" height="15.315" viewBox="0 0 18.416 15.315">
    <g id="wallet" transform="translate(0.25 0.25)">
      <g id="Group_11000" data-name="Group 11000">
        <g id="Group_10999" data-name="Group 10999">
          <path id="Path_12976" data-name="Path 12976" d="M15.332,44.308H2.584A2.587,2.587,0,0,0,0,46.892v9.647a2.587,2.587,0,0,0,2.584,2.584H15.332a2.587,2.587,0,0,0,2.584-2.584V46.892A2.587,2.587,0,0,0,15.332,44.308Zm1.55,8.958h-3.79a1.55,1.55,0,0,1,0-3.1h3.79Zm0-4.134h-3.79a2.584,2.584,0,1,0,0,5.168h3.79v2.239a1.552,1.552,0,0,1-1.55,1.55H2.584a1.552,1.552,0,0,1-1.55-1.55V46.892a1.552,1.552,0,0,1,1.55-1.55H15.332a1.552,1.552,0,0,1,1.55,1.55Z" transform="translate(0 -44.308)" stroke-width="0.5"/>
        </g>
      </g>
      <g id="Group_11002" data-name="Group 11002" transform="translate(12.575 6.89)">
        <g id="Group_11001" data-name="Group 11001">
          <path id="Path_12977" data-name="Path 12977" d="M360.591,241.231H359.9a.517.517,0,1,0,0,1.034h.689a.517.517,0,1,0,0-1.034Z" transform="translate(-359.385 -241.231)" stroke-width="0.5"/>
        </g>
      </g>
    </g>
  </svg>`,
    `<svg id="view-dashboard" xmlns="http://www.w3.org/2000/svg" width="16.683" height="16.683" viewBox="0 0 16.683 16.683">
  <path id="view-dashboard-2" data-name="view-dashboard" d="M12.268,3V8.561h7.415V3M12.268,19.683h7.415V10.415H12.268M3,19.683h7.415V14.122H3m0-1.854h7.415V3H3Z" transform="translate(-3 -3)"/>
</svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="20.549" height="18.551" viewBox="0 0 20.549 18.551">
      <g id="Component_6_1" data-name="Component 6 – 1" transform="translate(1 1)">
        <path id="Path_30" data-name="Path 30" d="M14.939,591.86v-2.421a3.19,3.19,0,0,0-3.189-3.189H4.609a3.19,3.19,0,0,0-3.189,3.189v2.421" transform="translate(-1.42 -575.405)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <circle id="Ellipse_14" data-name="Ellipse 14" cx="3.699" cy="3.699" r="3.699" transform="translate(3.06)" fill="none"  stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <path id="Path_31" data-name="Path 31" d="M23.58,566.05a3.7,3.7,0,1,1,0,7.4" transform="translate(-11.683 -566.05)" fill="none"  stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <path id="Path_32" data-name="Path 32" d="M30.47,585.3s3.409.768,2.9,6.126" transform="translate(-14.874 -574.965)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
      </g>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24.5" height="25.551" viewBox="0 0 24.5 25.551">
    <g id="Component_7_1" data-name="Component 7 – 1" transform="translate(1 1)">
      <g id="Group_1800" data-name="Group 1800" transform="translate(0 7)">
        <path id="Path_30" data-name="Path 30" d="M14.939,591.86v-2.421a3.19,3.19,0,0,0-3.189-3.189H4.609a3.19,3.19,0,0,0-3.189,3.189v2.421" transform="translate(-1.42 -575.405)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <circle id="Ellipse_14" data-name="Ellipse 14" cx="3.699" cy="3.699" r="3.699" transform="translate(3.06 0)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <path id="Path_31" data-name="Path 31" d="M23.58,566.05a3.7,3.7,0,1,1,0,7.4" transform="translate(-11.683 -566.05)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <path id="Path_32" data-name="Path 32" d="M30.47,585.3s3.409.768,2.9,6.126" transform="translate(-14.873 -574.965)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
      </g>
      <g id="Group_1801" data-name="Group 1801" transform="translate(15.5)">
        <line id="Line_171" data-name="Line 171" x2="7" transform="translate(0 3.5)" fill="none" stroke-linecap="round" stroke-width="2"/>
        <line id="Line_172" data-name="Line 172" x2="7" transform="translate(3.5) rotate(90)" fill="none" stroke-linecap="round" stroke-width="2"/>
      </g>
    </g>
  </svg>
  `,
    `<svg xmlns="http://www.w3.org/2000/svg" width="19.733" height="24.34" viewBox="0 0 19.733 24.34">
    <g id="Component_8_1" data-name="Component 8 – 1" transform="translate(0 1)">
      <g id="Group_1697" data-name="Group 1697" transform="translate(12.595)">
        <line id="Line_165" data-name="Line 165" y2="6.137" transform="translate(3.069)" fill="none" " stroke-linecap="round" stroke-width="2"/>
        <line id="Line_166" data-name="Line 166" y2="6.137" transform="translate(6.137 3.069) rotate(90)" fill="none" " stroke-linecap="round" stroke-width="2"/>
      </g>
      <g id="Group_1701" data-name="Group 1701" transform="translate(0 4.603)">
        <g id="Rectangle_17" data-name="Rectangle 17" transform="translate(2.903 0)" fill="none" " stroke-width="2">
          <rect width="8.708" height="8.708" rx="4.354" stroke="none"/>
          <rect x="1" y="1" width="6.708" height="6.708" rx="3.354" fill="none"/>
        </g>
        <g id="Path_7" data-name="Path 7" transform="translate(0 10.885)">
          <path d="M3.628,0h7.256a3.628,3.628,0,0,1,3.628,3.628C14.513,9.26,0,9.26,0,3.628A3.628,3.628,0,0,1,3.628,0Z" stroke="none"/>
          <path d="M 3.628235816955566 2.000001430511475 C 2.730425834655762 2.000001430511475 1.999995231628418 2.73042106628418 1.999995231628418 3.628231048583984 C 1.999995231628418 3.820571422576904 1.999995231628418 4.405901432037354 3.186745643615723 5.019961357116699 C 4.209005355834961 5.548901557922363 5.692365646362305 5.85227108001709 7.256465435028076 5.85227108001709 C 8.820565223693848 5.85227108001709 10.30391502380371 5.548901557922363 11.32617568969727 5.019961357116699 C 11.75887489318848 4.79607105255127 12.09234523773193 4.538341045379639 12.29054546356201 4.274631023406982 C 12.44434547424316 4.069991111755371 12.51293563842773 3.870631217956543 12.51293563842773 3.628231048583984 C 12.51293563842773 2.73042106628418 11.78250503540039 2.000001430511475 10.88469505310059 2.000001430511475 L 3.628235816955566 2.000001430511475 M 3.628235816955566 9.5367431640625e-07 L 10.88469505310059 9.5367431640625e-07 C 12.88851547241211 9.5367431640625e-07 14.51293563842773 1.624411106109619 14.51293563842773 3.628231048583984 C 14.51293563842773 6.44425630569458 10.88470077514648 7.852268695831299 7.256465435028076 7.852268695831299 C 3.628230094909668 7.852268695831299 -4.76837158203125e-06 6.44425630569458 -4.76837158203125e-06 3.628231048583984 C -4.76837158203125e-06 1.624411106109619 1.624415397644043 9.5367431640625e-07 3.628235816955566 9.5367431640625e-07 Z"/>
        </g>
      </g>
    </g>
  </svg>
  
  `,
  ];
  const [links, setlinks] = useState([
    {
      text: "Dashboard",
      link: "/dashboard/",
      name: "Dashboard",
    },
    {
      text: "Order Placement",
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
      children: [
        { text: "Shipping", link: "/dashboard/shipping" },
        { text: "Shipping Records", link: "/dashboard/shipping-records" },
      ],
    },
    {
      text: "Pay Supplier",
      link: "/dashboard/pay-supplier",
    },
    {
      text: "Track Order",
      link: "/dashboard/tracking",
    },
    {
      text: "Contact Support",
      link: "/dashboard/support",
    },
  ]);

  const openChild = (i, j) => {
    setTimeout(() => {
      setactiveIndex_(j);
      let linkParent = links.find((l, k) => k === i);
      let link = linkParent.children[j].link;
      if (link === "/dashboard/order-placement") {
        onOpenModal(1);
        return;
      }
      if (link === "/calculator") {
        onOpenModal(2);
        return;
      }
      setName && setName(linkParent.children[j].text);
      closeNav && closeNav();
      history.push(link);
    }, 100);
  };

  const goToLink = (i) => {
    let linkParent = links.find((l, k) => k === i);
    setName && setName(linkParent.text);
    let link = linkParent.link;
    link && history.push(link);
    setactiveIndex(i);
    setactiveIndex_(null);
    if (!linkParent.children && closeNav) {
      closeNav();
    }
  };
  return (
    <ul className="links">
      {links.map((link, i) => (
        <li key={`link${i}`} className={`pointer`} onClick={() => goToLink(i)}>
          <div
            className={`main-link ${i === activeIndex ? "active-link" : ""}`}
          >
            <span dangerouslySetInnerHTML={{ __html: icons[i] }}></span>
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
  );
};

export default withRouter(function Sidebar({ sideOpen, history, onOpenModal }) {
  return (
    <div className="sidebar">
      <div className="top">
        <img src={sideOpen ? logo : icon} alt="" />
      </div>
      <NavLinks
        sideOpen={sideOpen}
        history={history}
        onOpenModal={onOpenModal}
      />
    </div>
  );
});
