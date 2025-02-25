import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Undertrial Prisoner Dashboard</h1>
      <div className="dashboard-sections">
        <div className="dashboard-section bail-evaluation">
          <h2>Automated Bail Evaluation</h2>
          <hr></hr>
          <p>Evaluate your bail eligibility using our automated system.</p>
          <Link to="/bail-evaluation" className="dashboard-link">
            Go to Bail Evaluation
          </Link>
        </div>
        <div className="dashboard-section document-management">
          <h2>Easy Document Management</h2>
          <hr></hr>
          <p>Manage and upload your documents easily.</p>
          <Link to="/document-management" className="dashboard-link">
            Go to Document Management
          </Link>
        </div>
        <div className="dashboard-section legal-aid-request">
          <h2>Submit your cases</h2>
          <hr></hr>
          <p>Simple and fast case registration</p>
          <Link to="/cases" className="dashboard-link">
            Go to Case from submission
          </Link>
        </div>
        <div className="dashboard-section family-notifications">
          <h2>Family Notifications</h2>
          <hr></hr>
          <p>Notify your family about your case status.</p>
          <Link to="/family-notifications" className="dashboard-link">
            Go to Family Notifications
          </Link>
        </div>
        <div className="dashboard-section ai-chatbot">
          <h2>AI Chatbot</h2>
          <hr></hr>
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
