import React, { createContext, Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import { withSnackbar } from "react-simple-snackbar";
export const appContext = createContext();

export default withRouter(
  withSnackbar(
    class AppContextProvider extends Component {
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
        userCart: [],
        allUsers: [],
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

      componentDidMount() {
        axios.interceptors.response.use(
          (response) => {
            // Do something with response data
            return response;
          },
          (error) => {
            // Do something with response error
            let error_ = error.ersponse
              ? error.response.data.error.message
              : "";
            // handle expired token
            if (error_ === "Unauthenticated.") {
              this.props.openSnackbar(
                "Your session has expired, Kindly login to resume.",
                10000
              );
              setTimeout(() => {
                this.props.history.push("/login");
              }, 4000);
            }
            return Promise.reject(error);
          }
        );
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

      updateUserCart = (userCart) => this.setState({ userCart });

      saveShippings = (shippingTypes) => this.setState({ shippingTypes });

      saveUserShippings = (shippings) => this.setState({ shippings });

      saveAllUsers = (allUsers) => this.setState({ allUsers });

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
          updateUserCart,
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
          saveAllUsers,
        } = this;
        return (
          <appContext.Provider
            value={{
              ...this.state,
              updateUser,
              updateNotifications,
              updateLoggedInStatus,
              updateCart,
              updateUserCart,
              clearCart,
              removeItem,
              saveOrders,
              setWebsites,
              setrates,
              saveAddresses,
              setTnx,
              saveShippings,
              saveUserShippings,
              saveAllUsers,
            }}
          >
            {this.props.children}
          </appContext.Provider>
        );
      }
    },
    {
      position: "top-right",
    }
  )
);
