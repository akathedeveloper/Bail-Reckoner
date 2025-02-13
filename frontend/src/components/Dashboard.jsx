
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Undertrial Prisoner Dashboard</h1>
      <div className="dashboard-sections">
        <div className="dashboard-section bail-evaluation">
          <h2>Automated Bail Evaluation</h2>
          <p>Evaluate your bail eligibility using our automated system.</p>
          <Link to="/bail-evaluation" className="dashboard-link">
            Go to Bail Evaluation
          </Link>
        </div>
        <div className="dashboard-section document-management">
          <h2>Easy Document Management</h2>
          <p>Manage and upload your documents easily.</p>
          <Link to="/document-management" className="dashboard-link">
            Go to Document Management
          </Link>
        </div>
        <div className="dashboard-section legal-aid-request">
          <h2>Simple Legal Aid Requests</h2>
          <p>Request legal aid assistance easily.</p>
          <Link to="/legal-aid-request" className="dashboard-link">
            Go to Legal Aid Requests
          </Link>
        </div>
        <div className="dashboard-section family-notifications">
          <h2>Family Notifications</h2>
          <p>Notify your family about your case status.</p>
          <Link to="/family-notifications" className="dashboard-link">
            Go to Family Notifications
          </Link>
        </div>
        <div className="dashboard-section ai-chatbot">
          <h2>AI Chatbot</h2>
          <p>Ask your legal questions to our AI chatbot.</p>
          <Link to="/ai-chatbot" className="dashboard-link">
            Go to AI Chatbot
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
