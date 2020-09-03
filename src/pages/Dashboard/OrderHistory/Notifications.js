import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./Orderhistory.scss";
import Modal from "react-responsive-modal";
import apiServices from "../../../services/apiServices";
import { appContext } from "../../../store/appContext";
import { useSnackbar } from "react-simple-snackbar";
import Loader from "../../../components/loader/Loader";
import IsAdmin from "../../../components/isAdmin/IsAdmin";

export default withRouter(function Notifications({ history }) {
  const [open, setopen] = useState(false);
  const context = useContext(appContext);
  const [loading, setloading] = useState(false);
  const [users, setusers] = useState([]);
  const [title, settitle] = useState("");
  const [body, settext] = useState("");
  const [selectedUsers, setselectedUsers] = useState("");
  const [filterVal, setFilterVal] = useState("");

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
    let data = { title, body, users: selectedUsers };
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
        openSnackbar(
          err.response.data.error.message || "An error occured",
          5000
        );
        console.log(err);
      });
  };

  const pickUsers = (val) => {
    if (val) {
      let data = users.map((u) => u.id);
      console.log(data);
      setselectedUsers(data);
    } else {
      setselectedUsers([]);
    }
  };

  return (
    <IsAdmin>
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
          Notifications
          <div className="form f-right">
            <input
              type="text"
              placeholder="serch user"
              style={{ width: "200px", marginRight: 15 }}
              onChange={(e) => setFilterVal(e.target.value)}
              className="bd-inp"
            />
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
                    onChange={(e) => pickUsers(e.target.checked)}
                  />
                </th>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Balance</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {users
                .filter((usr) => {
                  return (
                    usr.full_name
                      .toLowerCase()
                      .includes(filterVal.toLowerCase()) ||
                    usr.email.toLowerCase().includes(filterVal.toLowerCase()) ||
                    usr.phone.toLowerCase().includes(filterVal.toLowerCase())
                  );
                })
                .map((row, i) => (
                  <tr key={`row${i}`}>
                    <td>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={selectedUsers.includes(row.id)}
                        onChange={() => updateUsers(row.id)}
                      />
                    </td>
                    <td>{row.created_at}</td>
                    <td>{row.full_name}</td>
                    <td>{row.email}</td>
                    <td>{row.country}</td>
                    <td>
                      <b>NGN {row.balance}</b>
                    </td>
                    {/* <td className="pointer"></td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </IsAdmin>
  );
});
