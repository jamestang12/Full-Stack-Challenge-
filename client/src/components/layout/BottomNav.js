import React from "react";
import { Link } from "react-router-dom";

export const BottomNav = () => {
  return (
    <div>
      <nav className="nav">
        <Link to="/" className="nav__link">
          <i className="material-icons nav__icon">lock</i>
          <span className="nav__text"> Privacy</span>
        </Link>
        <Link to="/completed" className="nav__link">
          <i className="material-icons nav__icon">settings</i>
          <span className="nav__text"> Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default BottomNav;
