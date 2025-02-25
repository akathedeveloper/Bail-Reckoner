import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../components/Navbar';
import { UserCheck, Star, Clock } from 'lucide-react';
import '../assets/css/legalaidList.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LegalAidList = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedCaseId = localStorage.getItem('selectedCaseId');
  const userEmail = localStorage.getItem('userEmail'); // current user's email

  useEffect(() => {
    fetchLegalAidProviders();
  }, []);

  const fetchLegalAidProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'legal aid provider')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProviders(data);
    } catch (error) {
      console.error('Error fetching legal aid providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReview = async (providerEmail) => {
    if (!selectedCaseId) {
      alert('No case selected.');
      return;
    }
    
    // Save the selected provider's email to local storage
    localStorage.setItem('selectedProviderEmail', providerEmail);

    try {
      const { data, error } = await supabase
        .from('requests')
        .insert([
          {
            case_id: selectedCaseId,
            requested_by: userEmail,
            provider_email: providerEmail,
            status: 'Pending',
          },
        ]);
      
      if (error) throw error;
      alert('Request sent successfully!');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading legal aid providers...</div>;
  }

  return (
    <div className="legalList-outer">
      <Navbar />
      <div className="legal-aid-list">
        <div className="legallist-header">
          <UserCheck className="header-icon" />
          <h1>Legal Aid Providers</h1>
        </div>

        <div className="providers-grid">
          {providers.map((provider) => (
            <div key={provider.id} className="provider-card">
              <div className="provider-header">
                <div className="provider-avatar">
                  {provider.full_name?.charAt(0) || provider.email.charAt(0)}
                </div>
                <div className="provider-info">
                  <h2>{provider.full_name || 'Legal Aid Provider'}</h2>
                  <p className="provider-email">{provider.email}</p>
                </div>
              </div>

              <div className="provider-stats">
                <div className="stat">
                  <Star className="stat-icon" />
                  <span>{provider.cases_handled || 0} Cases Handled</span>
                </div>
                <div className="stat">
                  <Clock className="stat-icon" />
                  <span>Member since {formatDate(provider.created_at)}</span>
                </div>
              </div>

              {provider.specialization && (
                <div className="provider-specialization">
                  <h3>Specialization</h3>
                  <p>{provider.specialization}</p>
                </div>
              )}

              <button
                className="request-review-btn"
                onClick={() => handleRequestReview(provider.email)}
              >
                Request Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalAidList;