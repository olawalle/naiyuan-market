import axios from "axios";
import * as urls from "./urls";

let signupUser = (data) => {
  return axios({
    method: "post",
    url: urls.signupUrl,
    data,
  });
};

let userLogin = (data) => {
  return axios({
    method: "post",
    url: urls.loginUrl,
    data,
  });
};

let getCurrentUser = () => {
  return axios({
    method: "get",
    url: urls.userUrl,
  });
};

let activateUser = (code) => {
  return axios({
    method: "get",
    url: `${urls.activateUrl}/${code}`,
  });
};

let postOrder = (data) => {
  return axios({
    method: "post",
    url: urls.orderUrl,
    data,
  });
};

let updateOrder = (data, id) => {
  return axios({
    method: "post",
    url: `${urls.orderUrl}/update/${id}`,
    data,
  });
};

let getOrders = () => {
  return axios({
    method: "get",
    url: urls.orderUrl,
  });
};

let getAllOrders = () => {
  return axios({
    method: "get",
    url: `${urls.orderUrl}/all`,
  });
};

let postProcurement = (data) => {
  return axios({
    method: "post",
    url: urls.procurementsUrl,
    data,
  });
};

let getProcurements = () => {
  return axios({
    method: "get",
    url: urls.procurementsUrl,
  });
};

let getAllProcurements = () => {
  return axios({
    method: "get",
    url: `${urls.procurementsUrl}/all`,
  });
};

let getAllShippingTypes = () => {
  return axios({
    method: "get",
    url: `${urls.shippingTypesUrl}`,
  });
};

let getUserShippings = () => {
  return axios({
    method: "get",
    url: urls.userShippingUrl,
  });
};

let adminGetAllShippings = () => {
  return axios({
    method: "get",
    url: urls.allShippingsUrl,
  });
};

let adminGetAllOrders = () => {
  return axios({
    method: "get",
    url: urls.allOrdersUrl,
  });
};

let adminGetAllProcurements = () => {
  return axios({
    method: "get",
    url: urls.allProcurementsUrl,
  });
};

let getAllUserss = () => {
  return axios({
    method: "get",
    url: `${urls.usersUrl}`,
  });
};

let uploadPic = (data) => {
  return axios({
    method: "post",
    url: urls.picturesUrl,
    data,
  });
};

let requestPaystack = (data) => {
  return axios({
    method: "post",
    url: urls.paystackUrl,
    data,
  });
};

let getNotifications = () => {
  return axios({
    method: "get",
    url: urls.notificationsUrl,
  });
};

let postNotification = (data) => {
  return axios({
    method: "post",
    url: urls.notificationsUrl,
    data,
  });
};

let requestReset = (data) => {
  return axios({
    method: "post",
    url: urls.forgotPasswordUrl,
    data,
  });
};

let getRates = () => {
  return axios({
    method: "get",
    url: urls.ratesUrl,
  });
};

let addRate = (data) => {
  return axios({
    method: "post",
    url: `${urls.ratesUrl}/create`,
    data,
  });
};

let updateRate = (data, id) => {
  return axios({
    method: "post",
    url: `${urls.ratesUrl}/update/${id}`,
    data,
  });
};

let getWebsites = () => {
  return axios({
    method: "get",
    url: `${urls.websitesUrl}s`,
  });
};

let addWebsite = (data) => {
  return axios({
    method: "post",
    url: `${urls.websitesUrl}/create`,
    data,
  });
};

let updateWebsite = (data, id) => {
  return axios({
    method: "post",
    url: `${urls.websitesUrl}/update/${id}`,
    data,
  });
};

let postPayment = (data) => {
  return axios({
    method: "post",
    url: urls.paymentsUrl,
    data,
  });
};

let getLinkDetails = (data) => {
  return axios({
    method: "post",
    url: urls.linkUrl,
    data,
  });
};

let verifyAcctFunding = (data) => {
  return axios({
    method: "post",
    url: urls.verifypaymentUrl,
    data,
  });
};

let withdrawFund = (data) => {
  return axios({
    method: "post",
    url: urls.withdrawalUrl,
    data,
  });
};

let getTnxs = () => {
  return axios({
    method: "get",
    url: urls.transactionsUrl,
  });
};

let getAddresses = () => {
  return axios({
    method: "get",
    url: urls.addressUrl,
  });
};

let addAddress = (data) => {
  return axios({
    method: "post",
    url: urls.addressUrl,
    data,
  });
};

let deleteAddress = (id) => {
  return axios({
    method: "delete",
    url: `${urls.addressUrl}/id`,
  });
};

let getShippingTypes = () => {
  return axios({
    method: "get",
    url: `${urls.shippingTypeUrl}s`,
  });
};

let addShippingType = (data) => {
  return axios({
    method: "post",
    url: `${urls.shippingTypeUrl}/create`,
    data,
  });
};

let updateShippingType = (data, id) => {
  return axios({
    method: "post",
    url: `${urls.shippingTypeUrl}/update/${id}`,
    data,
  });
};

let deleteShippingType = (id) => {
  return axios({
    method: "delete",
    url: `${urls.shippingTypeUrl}/id`,
  });
};

let uploadShipping = (data) => {
  return axios({
    method: "post",
    url: urls.shippingUrl,
    data,
  });
};

let trackShipping = (id) => {
  return axios({
    method: "get",
    url: `${urls.trackingUrl}/${id}`,
  });
};

export default {
  signupUser,
  userLogin,
  getCurrentUser,
  activateUser,
  postOrder,
  getRates,
  addRate,
  updateRate,
  postProcurement,
  getProcurements,
  uploadPic,
  getOrders,
  updateOrder,
  requestPaystack,
  getNotifications,
  requestReset,
  getWebsites,
  addWebsite,
  updateWebsite,
  postPayment,
  getLinkDetails,
  verifyAcctFunding,
  withdrawFund,
  getTnxs,
  getAddresses,
  addAddress,
  deleteAddress,
  getUserShippings,
  uploadShipping,
  trackShipping,
  getAllOrders,
  getAllProcurements,
  getAllShippingTypes,
  getAllUserss,
  postNotification,
  getShippingTypes,
  addShippingType,
  updateShippingType,
  deleteShippingType,
  adminGetAllShippings,
  adminGetAllOrders,
  adminGetAllProcurements,
};
