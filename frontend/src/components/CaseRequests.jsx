import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../components/Navbar';
import { FileText, UserCheck } from 'lucide-react';
import '../assets/css/requestList.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  // Current legal aid provider's email from local storage
  const providerEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      /**
       * 1) Use "cases:case_id(*)" to fetch the related case data
       *    from the "cases" table, referencing the foreign key "case_id".
       * 2) This assumes you have a 1:1 relationship set up in Supabase:
       *    requests.case_id -> cases.id
       */
      const { data, error } = await supabase
        .from('requests')
        .select('*, cases:case_id(*)')
        .eq('provider_email', providerEmail)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, caseId) => {
    try {
      // Update the case: assign the legal aid provider's email to the case
      const { error: updateCaseError } = await supabase
        .from('cases')
        .update({ legalAid: providerEmail })
        .eq('id', caseId);

      if (updateCaseError) throw updateCaseError;

      // Update the request status to "Accepted"
      const { error: updateRequestError } = await supabase
        .from('requests')
        .update({ status: 'Accepted' })
        .eq('id', requestId);

      if (updateRequestError) throw updateRequestError;

      alert('Case Accepted!');
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request.');
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: 'Declined' })
        .eq('id', requestId);

      if (error) throw error;
      alert('Case Declined.');
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error('Error declining request:', error);
      alert('Failed to decline request.');
    }
  };

  if (loading) {
    return <div className="loading">Loading requests...</div>;
  }

  return (
    <div className="requestList-outer">
      <Navbar />
      <div className="requests-list">
        <div className="requestlist-header">
          <FileText className="header-icon" />
          <h1>Received Requests</h1>
        </div>

        {requests.length === 0 ? (
          <p className="no-requests">No requests available.</p>
        ) : (
          requests.map((request) => {
            // 'caseData' is the related object from 'cases:case_id(*)'
            const caseData = request.cases;

            return (
              <div key={request.id} className="request-card">
                <div className="request-info">
                <div className="request-title">
                  <UserCheck className="request-icon" />
                  <h2>CASE-{caseData?.id || request.case_id}</h2>
                </div>
                  <p>
                    <strong>Requested By:</strong> {request.requested_by}
                  </p>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                </div>
                <hr></hr>
                {caseData && (
                  <div className="case-details">
                    {/* Make sure these column names match your DB exactly */}
                    <p><strong>Age:</strong> {caseData.age}</p>
                    <p><strong>Offense:</strong> {caseData.offenseNature}</p>
                    <p><strong>Severity:</strong> {caseData.severity}</p>
                    <p><strong>Custody Time:</strong> {caseData.custodyTime}</p>
                    <p><strong>Bail Amount:</strong> {caseData.bailAmount}</p>
                    <p><strong>Case Description:</strong> {caseData.caseDescription}</p>
                  </div>
                )}

                {request.status === 'Pending' && (
                  <div className="request-actions">
                    <button
                      className="accept-btn"
                      onClick={() => handleAcceptRequest(request.id, request.case_id)}
                    >
                      Accept Case
                    </button>
                    <button
                      className="decline-btn"
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      Decline Case
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RequestsList;
