import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <header id="header">
      <div className="container">
      <div className="logo">
          <Link to="/" className="logo-link">
            Bail Reckoner
          </Link>
        </div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cases" className="nav-link">
                Cases
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bail" className="nav-link">
                Bail Eligibility
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
