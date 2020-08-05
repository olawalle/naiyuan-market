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
    cart: [],
    notifications: [],
    orders: [],
    websites: [],
    rates: [],
    tnx: [],
    addresses: [],
    shippingTypes: [],
    shippings: [],
  };

  componentWillMount() {
    let state = JSON.parse(localStorage.getItem("naiyuanStore"));
    this.setState(state);
    let token = sessionStorage.getItem("naiyuan_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    this.setState({
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
      cart: [],
    });
    sessionStorage.clear();
  };

  saveOrders = (orders) => this.setState({ orders });

  saveAddresses = (addresses) => this.setState({ addresses });

  saveShippings = (shippingTypes) => this.setState({ shippingTypes });

  saveUserShippings = (shippings) => this.setState({ shippings });

  updateUser = (user) => {
    this.setState({ user });
  };

  setWebsites = (websites) => {
    this.setState({ websites });
  };

  setrates = (rates) => this.setState({ rates });

  setTnx = (tnx) => this.setState({ tnx });

  updateNotifications = (notifications) => {
    this.setState({ notifications });
  };

  updateCart = (item) => {
    this.setState({ cart: [...this.state.cart, item] });
  };

  clearCart = () => {
    this.setState({ cart: [] });
  };

  removeItem = (j) => {
    let items = this.state.cart.filter((item, i) => i !== j);
    this.setState({ cart: items });
  };

  updateLoggedInStatus = (status) => {
    this.setState({ isLoggedIn: status });
  };

  render() {
    const {
      updateUser,
      updateLoggedInStatus,
      updateCart,
      clearCart,
      removeItem,
      updateNotifications,
      saveOrders,
      setWebsites,
      setrates,
      saveAddresses,
      setTnx,
      saveShippings,
      saveUserShippings,
    } = this;
    return (
      <appContext.Provider
        value={{
          ...this.state,
          updateUser,
          updateNotifications,
          updateLoggedInStatus,
          updateCart,
          clearCart,
          removeItem,
          saveOrders,
          setWebsites,
          setrates,
          saveAddresses,
          setTnx,
          saveShippings,
          saveUserShippings,
        }}
      >
        {this.props.children}
      </appContext.Provider>
    );
  }
}
