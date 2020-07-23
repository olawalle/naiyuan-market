import React, { createContext, Component } from "react";
import axios from "axios";
export const appContext = createContext();

export default class AppContextProvider extends Component {
  state = {
    isLoggedIn: false,
    user: {
      balance: null,
      country: "",
      country_code: "",
      created_at: "",
      email: "",
      first_name: "",
      full_name: "",
      id: null,
      is_active: null,
      is_locked: null,
      last_name: "",
      phone: "",
      phone_number: "",
      role: null,
      updated_at: "2020-07-20 14:35:53",
      username: "",
    },
  };

  componentWillMount() {
    let state = JSON.parse(localStorage.getItem("naiyuanStore"));
    this.setState(state);
    let token = sessionStorage.getItem("naiyuan_token");
    axios.defaults.headers.common["Authorization"] = `${token}`;
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      // Whatever storage mechanism you end up deciding to use.
      localStorage.setItem("naiyuanStore", JSON.stringify(this.state));
    } else {
      localStorage.setItem("naiyuanStore", JSON.stringify(prevState));
    }
  }

  logout = () => {
    this.setState({});
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
    }, 1000);
  };

  updateUser = (user) => {
    this.setState({ user });
  };

  updateLoggedInStatus = (status) => {
    this.setState({ isLoggedIn: status });
  };

  render() {
    const { updateUser, updateLoggedInStatus } = this;
    return (
      <appContext.Provider
        value={{
          ...this.state,
          updateUser,
          updateLoggedInStatus,
        }}
      >
        {this.props.children}
      </appContext.Provider>
    );
  }
}
