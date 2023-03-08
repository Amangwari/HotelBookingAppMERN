import "./navbar.css";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: 500,
            fontSize: "30px",
          }}
        >
          <span className="logo">HotelBooking</span>
        </NavLink>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
