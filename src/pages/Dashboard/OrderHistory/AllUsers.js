import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import Modal from "react-responsive-modal";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../../components/loader/Loader";
import dayjs from "dayjs";
import IsAdmin from "../../../components/isAdmin/IsAdmin";

export default withRouter(function AllUsers({ history }) {
  const [open, setopen] = useState(false);
  const context = useContext(appContext);
  const [filterVal, setFilterVal] = useState("");
  const { websites, allUsers, saveAllUsers } = context;
  const options = {
    position: "top-right",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  useEffect(() => {
    fetchUsers();
  }, []);

  const blockUser = (i, is_locked) => {
    apiServices
      .blockUser(i)
      .then((res) => {
        console.log(res);
        !is_locked
          ? openSnackbar("User locked suxessfully", 5000)
          : openSnackbar("User unblocked sucessfully", 5000);
        fetchUsers();
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const fetchUsers = () => {
    apiServices
      .getAllUserss()
      .then((res) => {
        saveAllUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <IsAdmin>
      <div className="orderHistory">
        <div className="header">
          All Users
          <div className="form f-right">
            <input
              type="text"
              placeholder="serch user"
              style={{ width: "200px" }}
              onChange={(e) => setFilterVal(e.target.value)}
              className="bd-inp"
            />
          </div>
        </div>

        <div className="gradient w100p mt50">
          <table className="white-table">
            <thead>
              <tr>
                <th>Full name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Balance</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {allUsers
                .filter((usr) => {
                  return (
                    usr.full_name
                      .toLowerCase()
                      .includes(filterVal.toLowerCase()) ||
                    usr.email.toLowerCase().includes(filterVal.toLowerCase()) ||
                    (usr.phone &&
                      usr.phone.toLowerCase().includes(filterVal.toLowerCase()))
                  );
                })
                .map((user, i) => (
                  <tr key={`row${i}`}>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.country}</td>
                    <td>NGN {user.balance.toLocaleString()}</td>
                    <td>{user.rolevalue}</td>
                    <td>
                      <span
                        className="pointer"
                        style={{
                          padding: "5px 10px",
                          borderRadius: 20,
                          backgroundColor: !user.is_locked
                            ? "#ff130217"
                            : "#02ffff17",
                          color: !user.is_locked ? "#ff0c03" : "#008a57",
                        }}
                        onClick={() => blockUser(user.id, user.is_locked)}
                      >
                        {!user.is_locked ? "Block" : "Unblock"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </IsAdmin>
  );
});
