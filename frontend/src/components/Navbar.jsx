import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Bail Reckoner
        </Link>
        <ul className="navbar-nav">
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
      </div>
    </nav>
  );
};

export default Navbar;
