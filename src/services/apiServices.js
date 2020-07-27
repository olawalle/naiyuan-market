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

let postOrder = (data) => {
  return axios({
    method: "post",
    url: urls.orderUrl,
    data,
  });
};

let getOrders = () => {
  return axios({
    method: "get",
    url: urls.orderUrl,
  });
};

let getRates = () => {
  return axios({
    method: "get",
    url: urls.ratesUrl,
  });
};

let postProcurement = (data) => {
  return axios({
    method: "post",
    url: urls.procurementsUrl,
    data,
  });
};

let uploadPic = (data) => {
  return axios({
    method: "post",
    url: urls.picturesUrl,
    data,
  });
};

export default {
  signupUser,
  userLogin,
  postOrder,
  getRates,
  postProcurement,
  uploadPic,
  getOrders,
};
