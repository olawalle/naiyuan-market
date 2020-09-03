import React from "react";
import "./avatar.scss";
import apiServices from "../../services/apiServices";
import { useContext } from "react";
import { appContext } from "../../store/appContext";
import { mainUrl } from "../../services/urls";

import edit from "../../assets/pen.svg";
import camera from "../../assets/camera.svg";

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
          backgroundPosition: "center",
          backgroundImage:
            user.picture && user.picture.path
              ? `url(${mainUrl}/image/${user.picture.path})`
              : "",
        }}
      >
        <img src={camera} width={20} alt="" />
      </div>
      <div className="edit">
        <img src={edit} width={20} alt="" />
      </div>
    </div>
  );
}
