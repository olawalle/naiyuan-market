import React from "react";
import "./Profile.scss";
import { withRouter } from "react-router-dom";
import Nav from "../../components/Nav/Nav";

export default withRouter(function Terms({ history }) {
  const toDash = () => {
    history.push("/profile/");
  };
  return (
    <div className="profile">
      <Nav showLogo={true} />
      <div className="header shrink">
        <div className="left t-left">
          <span onClick={toDash} className="light pointer">
            Edit Profile
          </span>
          <span className="thick">Term Of Service</span>
        </div>
      </div>
      <div className="terms">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias maxime,
          placeat nihil magni libero aspernatur distinctio dolorum, natus
          tempore deserunt odio autem a facere voluptates ullam iusto error
          eligendi praesentium. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque aliquid officiis sit id repellat ullam, et
          rem, optio ab nesciunt, deleniti sed. Id perferendis nulla
          exercitationem officiis esse eos ullam! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Alias maxime, placeat nihil magni libero
          aspernatur distinctio dolorum, natus tempore deserunt odio autem a
          facere voluptates ullam iusto error eligendi praesentium. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Eaque aliquid officiis
          sit id repellat ullam, et rem, optio ab nesciunt, deleniti sed. Id
          perferendis nulla exercitationem officiis esse eos ullam!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias maxime,
          placeat nihil magni libero aspernatur distinctio dolorum, natus
          tempore deserunt odio autem a facere voluptates ullam iusto error
          eligendi praesentium. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque aliquid officiis sit id repellat ullam, et
          rem, optio ab nesciunt, deleniti sed. Id perferendis nulla
          exercitationem officiis esse eos ullam!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias maxime,
          placeat nihil magni libero aspernatur distinctio dolorum, natus
          tempore deserunt odio autem a facere voluptates ullam iusto error
          eligendi praesentium. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque aliquid officiis sit id repellat ullam, et
          rem, optio ab nesciunt, deleniti sed. Id perferendis nulla
          exercitationem officiis esse eos ullam!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias maxime,
          placeat nihil magni libero aspernatur distinctio dolorum, natus
          tempore deserunt odio autem a facere voluptates ullam iusto error
          eligendi praesentium. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque aliquid officiis sit id repellat ullam, et
          rem, optio ab nesciunt, deleniti sed. Id perferendis nulla
          exercitationem officiis esse eos ullam!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias maxime,
          placeat nihil magni libero aspernatur distinctio dolorum, natus
          tempore deserunt odio autem a facere voluptates ullam iusto error
          eligendi praesentium. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque aliquid officiis sit id repellat ullam, et
          rem, optio ab nesciunt, deleniti sed. Id perferendis nulla
          exercitationem officiis esse eos ullam!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias maxime,
          placeat nihil magni libero aspernatur distinctio dolorum, natus
          tempore deserunt odio autem a facere voluptates ullam iusto error
          eligendi praesentium. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque aliquid officiis sit id repellat ullam, et
          rem, optio ab nesciunt, deleniti sed. Id perferendis nulla
          exercitationem officiis esse eos ullam!
        </p>
      </div>
    </div>
  );
});
