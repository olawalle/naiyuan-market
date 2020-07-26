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

let getRates = () => {
  return axios({
    method: "get",
    url: urls.ratesUrl,
  });
};

export default {
  signupUser,
  userLogin,
  postOrder,
  getRates,
};
