import { Link } from "react-router-dom";

const JudgeDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Judge Dashboard</h1>
      <div className="dashboard-sections">
        <div className="dashboard-section case-overview">
          <h2>Case Overview</h2>
          <p>Review cases and make judicial decisions.</p>
          <Link to="/case-overview" className="dashboard-link">
            Go to Case Overview
          </Link>
        </div>
        <div className="dashboard-section legal-reports">
          <h2>Legal Reports</h2>
          <p>Access detailed legal reports and case files.</p>
          <Link to="/legal-reports" className="dashboard-link">
            Go to Legal Reports
          </Link>
        </div>
        <div className="dashboard-section schedule-management">
          <h2>Scheduling</h2>
          <p>Manage your court schedule and hearings.</p>
          <Link to="/schedule-management" className="dashboard-link">
            Go to Schedule Management
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JudgeDashboard;
