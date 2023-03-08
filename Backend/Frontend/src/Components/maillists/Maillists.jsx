import "./maillist.css";
import React from "react";

const Maillists = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, Save Money!</h1>
      <span className="mailDesc">Sign up and We'll send the best deals to you</span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Your E-mail" />
          <button>Subscribe</button>
        </div>
     
    </div>
  );
};

export default Maillists;
