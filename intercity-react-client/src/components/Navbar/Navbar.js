import React from "react";
import "./Navbar.css";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">
          <Link to="/">
            <img
              className="navbar__logo"
              src="https://www.intercity.co.nz/resources/themes/intercity/images/intercity-logo.svg"
              alt=""
            />
          </Link>
        </div>

        <div className="navbar__booking">
          <Link to="/">BOOK</Link>
          <Link to="/manage">MANAGE</Link>
        </div>

        <div className="navbar__info">
          <Link to="/">Day Tours</Link>
          <Link to="/">FlexiPass</Link>
          <Link to="/">TravelPass</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Help Info</Link>
        </div>
      </div>

      <div className="navbar__right">
        <Avatar />
        <h5>Log in</h5>
      </div>
    </div>
  );
};

export default Navbar;
