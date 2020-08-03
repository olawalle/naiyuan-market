import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import Modal from "react-responsive-modal";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../../components/loader/Loader";

export default withRouter(function Notifications({ history }) {
  const [open, setopen] = useState(false);
  const context = useContext(appContext);
  const [loading, setloading] = useState(false);
  const [users, setusers] = useState([]);
  const [title, settitle] = useState("");
  const [body, settext] = useState("");
  const [selectedUsers, setselectedUsers] = useState("");

  const onCloseModal = () => {
    setopen(false);
  };

  const options = {
    position: "top-right",
  };

  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  useEffect(() => {
    getAllUsers();
  }, []);

  const updateUsers = (i) => {
    selectedUsers.includes(i)
      ? setselectedUsers(selectedUsers.filter((j) => j !== i))
      : setselectedUsers([...selectedUsers, i]);
  };

  const getAllUsers = () => {
    apiServices
      .getAllUserss()
      .then((res) => {
        console.log(res);
        setusers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNotification = () => {
    selectedUsers.map((user) => {
      let data = { title, body, "users[0]": user };
      console.log(data);
      setloading(true);
      apiServices
        .postNotification(data)
        .then((res) => {
          console.log(res);
          setloading(false);
          setopen(false);
          openSnackbar("Notification sent successfully", 5000);
        })
        .catch((err) => {
          setloading(false);
          openSnackbar("An error occured. Please try again", 5000);
          console.log(err);
        });
    });
  };

  return (
    <div className="orderHistory">
      <Modal open={open} onClose={onCloseModal} center>
        <div
          className="gradient t-center o-hidden placement-modal"
          style={{ padding: 30 }}
        >
          <div className="header">Post Notification</div>

          <div className="inp mb20">
            <span className="label">Title</span>
            <input
              onChange={(e) => settitle(e.target.value)}
              type="text"
              className={`w100p bd-input`}
            />
          </div>

          <div className="inp mb20">
            <span className="label">Text</span>
            <textarea
              onChange={(e) => settext(e.target.value)}
              type="text"
              rows={10}
              className={`w100p bd-input`}
              style={{ height: "auto" }}
            />
          </div>

          <button className="main-btn f-right" onClick={postNotification}>
            {loading ? <Loader /> : "Submit"}
          </button>
        </div>
      </Modal>
      <div className="header">
        All Users
        <div className="form f-right">
          <button
            className="main-btn f-right"
            onClick={() => {
              selectedUsers.length
                ? setopen(true)
                : openSnackbar("Please select recipient users first", 5000);
            }}
          >
            Send Notification
          </button>
        </div>
      </div>

      <div className="gradient w100p mt50">
        <table className="white-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    e.target.checked
                      ? setselectedUsers([...Array(users.length).keys()])
                      : setselectedUsers([]);
                  }}
                />
              </th>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((row, i) => (
              <tr key={`row${i}`}>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={selectedUsers.includes(i)}
                    onChange={() => updateUsers(i)}
                  />
                </td>
                <td>{row.created_at}</td>
                <td>{row.full_name}</td>
                <td>{row.email}</td>
                <td>{row.country}</td>
                <td>
                  <b>NGN {row.balance}</b>
                </td>
                <td className="pointer"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
