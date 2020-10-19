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

let blockUser = (id) => {
  return axios({
    method: "post",
    url: `${urls.baseUrl}user/${id}/lock`,
    data: {
      reason: "You are currently blocked",
    },
  });
};

let resetPassword = (data) => {
  return axios({
    method: "post",
    url: urls.passwordResetUrl,
    data,
  });
};

let changePassword = (data) => {
  return axios({
    method: "post",
    url: urls.changePasswordUrl,
    data,
  });
};

let getCurrentUser = () => {
  return axios({
    method: "get",
    url: urls.userUrl,
  });
};

let updateUser = (data) => {
  return axios({
    method: "post",
    url: urls.userUrl,
    data,
  });
};

let activateUser = (code) => {
  return axios({
    method: "get",
    url: `${urls.activateUrl}/${code}`,
  });
};

let uploadProfilePic = (data) => {
  return axios({
    method: "post",
    url: urls.profilePicUrl,
    data,
  });
};

let postOrder = (data) => {
  return axios({
    method: "post",
    url: urls.orderUrl,
    data,
  });
};

let adminPostOrder = (data) => {
  return axios({
    method: "post",
    url: urls.adminOrderUrl,
    data,
  });
};

let updateOrder = (data, id) => {
  return axios({
    method: "post",
    url: `${urls.baseUrl}orders/update/${id}`,
    data,
  });
};

let updateShipping = (data) => {
  return axios({
    method: "post",
    url: `${urls.baseUrl}shipping-status`,
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

let addToCart = (data) => {
  return axios({
    method: "post",
    url: urls.cartUrl,
    data,
  });
};

let adminGetFromCart = (id) => {
  return axios({
    method: "get",
    url: `${urls.getAdminCartUrl}/${id}`,
  });
};

let adminAddToCart = (data) => {
  return axios({
    method: "post",
    url: urls.adminCartUrl,
    data,
  });
};

let deleteFromCart = (id) => {
  return axios({
    method: "delete",
    url: urls.cartUrl + "/" + id,
  });
};

let getUserCart = () => {
  return axios({
    method: "get",
    url: urls.cartUrl,
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

let getLinkDetails = (data, n) => {
  return axios({
    method: "post",
    url: n === 1 ? urls.linkUrl : urls.link1688Url,
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
  blockUser,
  getCurrentUser,
  updateUser,
  activateUser,
  resetPassword,
  changePassword,
  uploadProfilePic,
  postOrder,
  adminPostOrder,
  getRates,
  addRate,
  updateRate,
  postProcurement,
  getProcurements,
  uploadPic,
  getOrders,
  updateOrder,
  updateShipping,
  requestPaystack,
  getNotifications,
  requestReset,
  getWebsites,
  addWebsite,
  updateWebsite,
  addToCart,
  adminGetFromCart,
  adminAddToCart,
  deleteFromCart,
  getUserCart,
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
