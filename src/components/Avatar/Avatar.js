import React from "react";
import "./avatar.scss";
import apiServices from "../../services/apiServices";
import { useContext } from "react";
import { appContext } from "../../store/appContext";
import { mainUrl } from "../../services/urls";

export default function Avatar() {
  const context = useContext(appContext);
  const { updateUser, user } = context;

  const uploadPhoto = (picture) => {
    let data = new FormData();
    data.append("picture", picture);
    apiServices
      .uploadProfilePic(data)
      .then((res) => {
        console.log(res);
        apiServices
          .getCurrentUser()
          .then((res) => {
            console.log(res);
            updateUser(res.data);
          })
          .catch((err) => {
            console.log({ err });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="avatar-wrap">
      <input
        type="file"
        onChange={(e) => uploadPhoto(e.target.files[0])}
        name=""
        id=""
      />
      <div
        className="avatar"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            user.picture && user.picture.path
              ? `url(${mainUrl}/image/${user.picture.path})`
              : "",
        }}
      ></div>
      <div className="edit">.</div>
    </div>
  );
}
