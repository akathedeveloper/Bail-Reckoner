import { Link } from "react-router-dom";

const LegalAidDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Legal Aid Provider Dashboard</h1>
      <div className="dashboard-sections">
        <div className="dashboard-section client-requests">
          <h2>Client Requests</h2>
          <p>Review and manage legal aid requests from clients.</p>
          <Link to="/client-requests" className="dashboard-link">
            Go to Client Requests
          </Link>
        </div>
        <div className="dashboard-section case-management">
          <h2>Case Management</h2>
          <p>Organize and manage your assigned cases.</p>
          <Link to="/case-management" className="dashboard-link">
            Go to Case Management
          </Link>
        </div>
        <div className="dashboard-section resource-center">
          <h2>Resource Center</h2>
          <p>Access legal resources and guidelines to assist clients.</p>
          <Link to="/resource-center" className="dashboard-link">
            Go to Resource Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegalAidDashboard;
