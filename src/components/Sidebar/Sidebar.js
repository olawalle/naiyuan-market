import React, { useState } from "react";
import "./Sidebar.scss";

import home from "../../assets/home.svg";
import logo from "../../assets/Logo.svg";
import icon from "../../assets/Icon.svg";
import { withRouter } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../../store/appContext";

export const NavLinks = ({
  onOpenModal,
  history,
  sideOpen,
  closeNav,
  setName,
  role,
}) => {
  const context = useContext(appContext);
  const { user } = context;
  const [activeIndex, setactiveIndex] = useState(0);
  const [activeIndex_, setactiveIndex_] = useState(null);
  const icons = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="16.683" height="15.908" viewBox="0 0 16.683 15.908"><defs><style>.a{}</style></defs><g transform="translate(0)"><path className="a" d="M74.039,120.939,65.713,128.3a.225.225,0,0,1-.007.046.227.227,0,0,0-.007.046v7.457a.99.99,0,0,0,.275.7.863.863,0,0,0,.652.3h5.561v-5.965h3.708v5.966h5.561a.861.861,0,0,0,.652-.3.99.99,0,0,0,.276-.7V128.4a.232.232,0,0,0-.015-.093Z" transform="translate(-65.698 -120.939)"/></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
    <g id="Group_9613" data-name="Group 9613" transform="translate(-48.849 -239.764)">
      <g id="message-square" transform="translate(49.849 240.764)">
        <path id="Path" d="M15,10a1.667,1.667,0,0,1-1.667,1.667h-10L0,15V1.667A1.667,1.667,0,0,1,1.667,0H13.333A1.667,1.667,0,0,1,15,1.667Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
      </g>
    </g>
  </svg>
  `,
    `<svg xmlns="http://www.w3.org/2000/svg" width="20.549" height="18.551" viewBox="0 0 20.549 18.551">
  <g id="Component_6_1" data-name="Component 6 – 1" transform="translate(1 1)">
    <path id="Path_30" data-name="Path 30" d="M14.939,591.86v-2.421a3.19,3.19,0,0,0-3.189-3.189H4.609a3.19,3.19,0,0,0-3.189,3.189v2.421" transform="translate(-1.42 -575.405)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
    <circle id="Ellipse_14" data-name="Ellipse 14" cx="3.699" cy="3.699" r="3.699" transform="translate(3.06)" fill="none"  stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
    <path id="Path_31" data-name="Path 31" d="M23.58,566.05a3.7,3.7,0,1,1,0,7.4" transform="translate(-11.683 -566.05)" fill="none"  stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
    <path id="Path_32" data-name="Path 32" d="M30.47,585.3s3.409.768,2.9,6.126" transform="translate(-14.874 -574.965)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
  </g>
</svg>`,
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
    `<svg xmlns="http://www.w3.org/2000/svg" width="20.571" height="23.246" viewBox="0 0 20.571 23.246"><defs></defs><g transform="translate(0.252 0.257)"><path className="a" d="M39.536,5.743h0s0,0,0,0,0-.031,0-.046,0-.015,0-.023,0-.018,0-.026,0-.019-.007-.029l0-.019c0-.01-.007-.02-.01-.029L39.5,5.548c0-.009-.008-.018-.012-.026L39.476,5.5l-.012-.022-.013-.022-.012-.017-.018-.024L39.409,5.4l-.022-.024-.013-.013-.023-.021-.02-.015-.019-.015-.038-.023,0,0h0l0,0L29.749.064a.515.515,0,0,0-.5,0l-9.52,5.227-.009.006-.01.005-.021.015-.026.018-.028.024-.023.021-.025.028-.019.023c-.008.01-.015.021-.022.032s-.011.016-.015.024-.012.024-.018.037-.008.015-.011.023-.011.031-.016.046,0,.011-.006.017a.525.525,0,0,0-.013.066c0,.005,0,.01,0,.015s0,.033,0,.05v8.715a.514.514,0,1,0,1.029,0V6.592l1.854.97v2.78a.514.514,0,1,0,1.029,0V8.213l2.611,1.4v4.154l-2.882-1.545a.514.514,0,0,0-.486.907l3.64,1.951a.514.514,0,0,0,.757-.453V10l1.969,1.03V21.379l-8.768-4.557a.514.514,0,0,0-.474.913l9.52,4.947.019.009.025.011.039.014.024.007.044.009.021,0a.51.51,0,0,0,.065,0h0a.523.523,0,0,0,.065,0l.021,0,.044-.009.024-.007.039-.014.025-.011.019-.009,9.52-4.947a.515.515,0,0,0,.277-.456V5.743ZM24.083,7.294l3.55-1.868L30,6.665,26.646,8.626Zm5.933,14.085V11.035L36.8,7.482a.514.514,0,0,0-.477-.912l-6.795,3.555-1.808-.939,3.6-2.1a.514.514,0,0,0-.021-.9l-3.434-1.8a.514.514,0,0,0-.478,0L22.971,6.716l-1.9-.987L29.5,1.1l9.006,4.945v10.92Z" transform="translate(-19.466 -0.001)"/><path className="a" d="M212.652,226.076l-4.064,2.107a.514.514,0,1,0,.474.913l4.064-2.107a.514.514,0,1,0-.474-.913Z" transform="translate(-195.357 -210.515)"/><path className="a" d="M212.652,191.55l-4.064,2.107a.514.514,0,1,0,.474.913l4.064-2.107a.514.514,0,1,0-.474-.913Z" transform="translate(-195.357 -178.357)"/><path className="a" d="M236.254,157.023l-2.326,1.206a.514.514,0,1,0,.474.913l2.326-1.206a.514.514,0,1,0-.474-.913Z" transform="translate(-218.959 -146.198)"/></g></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="20.549" height="18.551" viewBox="0 0 20.549 18.551">
      <g id="Component_6_1" data-name="Component 6 – 1" transform="translate(1 1)">
        <path id="Path_30" data-name="Path 30" d="M14.939,591.86v-2.421a3.19,3.19,0,0,0-3.189-3.189H4.609a3.19,3.19,0,0,0-3.189,3.189v2.421" transform="translate(-1.42 -575.405)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <circle id="Ellipse_14" data-name="Ellipse 14" cx="3.699" cy="3.699" r="3.699" transform="translate(3.06)" fill="none"  stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <path id="Path_31" data-name="Path 31" d="M23.58,566.05a3.7,3.7,0,1,1,0,7.4" transform="translate(-11.683 -566.05)" fill="none"  stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
        <path id="Path_32" data-name="Path 32" d="M30.47,585.3s3.409.768,2.9,6.126" transform="translate(-14.874 -574.965)" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
      </g>
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="16.189" height="22.919" viewBox="0 0 16.189 22.919"><defs></defs><g transform="translate(0.15 0.15)"><path className="a" d="M84.192,0a7.953,7.953,0,0,0-7.944,7.944c0,5.474,7.133,14.074,7.436,14.437a.662.662,0,0,0,1.016,0c.3-.363,7.436-8.964,7.436-14.437A7.953,7.953,0,0,0,84.192,0Zm0,20.9c-1.63-2.072-6.62-8.756-6.62-12.956a6.62,6.62,0,1,1,13.241,0C90.813,12.144,85.823,18.829,84.192,20.9Z" transform="translate(-76.248)"/><path className="a" d="M146.178,64.634h-.717a3.982,3.982,0,0,0-3.255-3.255v-.718a.662.662,0,1,0-1.324,0v.718a3.982,3.982,0,0,0-3.255,3.255h-.718a.662.662,0,0,0,0,1.324h.718a3.982,3.982,0,0,0,3.255,3.255v.718a.662.662,0,0,0,1.324,0v-.718a3.982,3.982,0,0,0,3.255-3.255h.717a.662.662,0,0,0,0-1.324Zm-4.634,3.31a2.648,2.648,0,1,1,2.648-2.648A2.651,2.651,0,0,1,141.544,67.944Z" transform="translate(-133.6 -57.352)"/></g></svg>
  `,
    `<svg xmlns="http://www.w3.org/2000/svg" width="22.396" height="22.394" viewBox="0 0 22.396 22.394"><defs></defs><g transform="translate(0.286 0.284)"><g transform="translate(0 0)"><path className="a" d="M21.4,3.644H8.468L7.63.871A1.233,1.233,0,0,0,6.1.051L4.248.6a1.239,1.239,0,0,0-.538.326L1.619,3.089a1.227,1.227,0,0,0-.313.591A18.916,18.916,0,0,0,1.9,12.843a19.112,19.112,0,0,0,4.587,7.984,1.235,1.235,0,0,0,.588.322l2.948.68a1.235,1.235,0,0,0,.278.032,1.25,1.25,0,0,0,.351-.051l1.027-.3.827-.244a1.217,1.217,0,0,0,.735-.593,1.2,1.2,0,0,0,.094-.927l-.462-1.526H21.4a1.457,1.457,0,0,0,1.457-1.457V5.1A1.457,1.457,0,0,0,21.4,3.644Zm-5.738,7.177,6.422-5.963a.715.715,0,0,1,.045.243V16.759a.725.725,0,0,1-.04.229ZM21.4,4.372a.724.724,0,0,1,.123.012L13.9,11.465a.729.729,0,0,1-.991,0L7.659,6.608l.387-.114A1.221,1.221,0,0,0,8.78,5.9a1.2,1.2,0,0,0,.094-.926l-.183-.6ZM6.732,15.022A8.866,8.866,0,0,1,5.087,11.9,8.214,8.214,0,0,1,4.9,7.446a.065.065,0,0,1,.045-.04l1.9-.559,4.279,3.959Zm5.866,5.3a.494.494,0,0,1-.3.24l-.483.142-.887-2.936a.364.364,0,1,0-.7.211l.887,2.931-.673.2a.51.51,0,0,1-.26.008l-2.948-.68A.51.51,0,0,1,7,20.306a18.347,18.347,0,0,1-4.4-7.673,18.18,18.18,0,0,1-.579-8.8.5.5,0,0,1,.128-.24L4.233,1.43A.506.506,0,0,1,4.452,1.3l.678-.2.887,2.935a.364.364,0,0,0,.349.259.35.35,0,0,0,.105-.016.364.364,0,0,0,.243-.454L5.83.891,6.309.75a.5.5,0,0,1,.626.332l1.239,4.1a.479.479,0,0,1-.036.369.5.5,0,0,1-.3.241l-.483.142-.143-.474a.364.364,0,0,0-.7.211l.142.469-1.916.565a.8.8,0,0,0-.542.546,8.954,8.954,0,0,0,.191,4.852,9.041,9.041,0,0,0,2.531,4.161.791.791,0,0,0,.752.164l1.92-.566.143.474a.364.364,0,1,0,.7-.211l-.142-.469.478-.141a.505.505,0,0,1,.627.332l1.239,4.1a.479.479,0,0,1-.038.372Zm.056-2.835L12.1,15.64a1.233,1.233,0,0,0-1.53-.82l-3.1.913a.073.073,0,0,1-.065-.012c-.051-.045-.109-.1-.177-.164L11.658,11.3l.752.7a1.462,1.462,0,0,0,1.983,0l.736-.683,6.415,6.157a.724.724,0,0,1-.142.016Z" transform="translate(-0.999 -0.001)"/><path className="a" d="M26.364,14.729h5.829a.364.364,0,0,0,0-.729H26.364a.364.364,0,0,0,0,.729Z" transform="translate(-16.892 -8.9)"/><path className="a" d="M55.364,22a.364.364,0,0,0-.364.364v5.1a.364.364,0,0,0,.729,0v-5.1A.364.364,0,0,0,55.364,22Z" transform="translate(-35.326 -13.985)"/></g></g></svg>
  `,
  ];
  const [links, setlinks] = useState([
    {
      text: "Dashboard",
      link: "/dashboard/",
      name: "Dashboard",
    },
    {
      name: "Product Sourcing",
      text: "Product Sourcing",
      link: "/dashboard/source-products",
    },
    {
      text: "Order Placement",
      children: [
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
        { text: "My Packages", link: "/dashboard/shipping" },
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

  const [adminLinks, setAdminLinks] = useState([
    {
      text: "All Users",
      link: "/dashboard/all-users/",
      name: "Users",
    },
    {
      text: "All Procurements",
      link: "/dashboard/all-orders/",
      name: "Orders",
    },
    {
      text: "All Shippings",
      link: "/dashboard/all-shippings/",
      name: "Shippings",
    },
    {
      text: "All Sourcing",
      link: "/dashboard/all-procurements/",
      name: "Shippings",
    },
    {
      name: "Exchange Rates",
      text: "Exchange Rates",
      link: "/dashboard/exchange-rates",
    },
    {
      name: "Websites",
      text: "Websites",
      link: "/dashboard/websites",
    },
    {
      name: "Shippers",
      text: "Shippers",
      link: "/dashboard/shipping-types",
    },
    {
      name: "Notifications",
      text: "Notifications",
      link: "/dashboard/notifications",
    },
  ]);
  const linksRendered = user.rolevalue === "superadmin" ? adminLinks : links;

  const openChild = (i, j) => {
    setTimeout(() => {
      let linkParent = linksRendered.find((l, k) => k === i);
      let link = linkParent.children[j].link;
      // if (link === "/dashboard/order-placement") {
      //   onOpenModal(1);
      //   return;
      // }
      if (link === "/calculator") {
        onOpenModal(2);
        return;
      }
      setactiveIndex_(j);
      setName && setName(linkParent.children[j].text);
      closeNav && closeNav();
      history.push(link);
    }, 100);
  };

  const goToLink = (i) => {
    let linkParent = linksRendered.find((l, k) => k === i);
    setName && setName(linkParent.text);
    let link = linkParent.link;
    link && history.push(link);

    if (linkParent.children) {
      activeIndex && activeIndex === i
        ? setactiveIndex(null)
        : setactiveIndex(i);
    } else {
      setactiveIndex(i);
    }
    setactiveIndex_(null);
    if (!linkParent.children && closeNav) {
      closeNav();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push("/login");
  };

  return (
    <ul className="links">
      {linksRendered.map((link, i) => (
        <li key={`link${i}`}>
          <div
            onClick={() => goToLink(i)}
            className={`main-link pointer ${
              i === activeIndex ? "active-link" : ""
            }`}
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
                    className={`inner-link pointer ${
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
      <li className="logout">
        <div onClick={() => handleLogout()} className={`main-link pointer`}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                fill="#ffcb05"
                d="M160 240h160V96a16 16 0 00-16-16H64a16 16 0 00-16 16v320a16 16 0 0016 16h240a16 16 0 0016-16V272H160zM459.31 244.69L368 153.37 345.37 176l64 64H320v32h89.37l-64 64L368 358.63l91.31-91.32a16 16 0 000-22.62z"
              />
            </svg>
          </span>
          {sideOpen && <span style={{ color: "#ffcb05" }}>Logout</span>}
        </div>
      </li>
    </ul>
  );
};

export default withRouter(function Sidebar({ sideOpen, history, onOpenModal }) {
  const context = useContext(appContext);
  const { user } = context;
  return (
    <div className="sidebar">
      <div className="top">
        <img src={sideOpen ? logo : icon} alt="" />
      </div>
      <NavLinks
        sideOpen={sideOpen}
        history={history}
        onOpenModal={onOpenModal}
        role={user.role}
      />
    </div>
  );
});
