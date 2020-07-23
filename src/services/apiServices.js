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

export default {
  signupUser,
  userLogin,
};
