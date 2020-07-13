import React from "react";
import "./Support.scss";

export default function Support() {
  return (
    <div className="support">
      <div className="wide">
        <div className="gradient">
          <div className="inp">
            <span className="label">Subject</span>
            <input className="border-inp" name="" />
          </div>

          <div className="inp">
            <span className="label">Write us a message</span>
            <textarea
              className="border-inp"
              name=""
              id=""
              cols="17"
              rows="8"
            ></textarea>
          </div>
          <div className="w100p t-right">
            <button className="main-btn">Submit</button>
          </div>
        </div>

        <div className="addresses">
          <div className="address">
            <p className="location">Lagos</p>
            <p className="details">
              <span>14/16 Osolo way</span>
              <span>Beside United Bank Of Africa</span>
              <span>Ajao Estate, Lagos</span>
              <span>Tel: +234 701 215 5658</span>
              <span>Email: Info@naiyuanmart.com</span>
            </p>
          </div>
          <div className="address mid">
            <p className="location">Kano</p>
            <p className="details">
              <span>No 20 IBB Way</span>
              <span>Kofai Wambai(Kurfi House)</span>
              <span>Kano</span>
              <span>Tel: +234 816 129 3562</span>
              <span>Email: Info@naiyuanmart.com</span>
            </p>
          </div>
          <div className="address">
            <p className="location">China</p>
            <p className="details">
              <span>Area A2, 2nd floor</span>
              <span>Yingfu Commercial City</span>
              <span>Guangyuan West Road,</span>
              <span>Tel: +8615603010790</span>
              <span>Email: Info@naiyuanmart.com</span>
            </p>
          </div>
        </div>
      </div>
      <div className="narrow"></div>
    </div>
  );
}
