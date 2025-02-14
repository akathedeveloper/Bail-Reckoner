import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../components/auth";
import "../assets/css/Navbar.css"; // Import the CSS file

const Navbar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    logout(); // Clear token and user data
    navigate("/"); // Navigate to the desired route (e.g., login page)
  };

  return (
    <header id="header">
      <div className="container">
        <div className="logo">
          <Link to="/home" className="logo-link">
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
            <li className="nav-item">
              <Link
                to="#"
                onClick={handleLogout}
                className="nav-link logout-button">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
