import React, { useState } from 'react';
import { useAuthStore } from '../components/auth';
import { KeyRound, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/signup.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(email, password);
    // Only navigate if there is no error
    if (!result?.error) {
      navigate('/login');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <KeyRound className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading} className="signup-button">
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        
        <p>Already have an account?</p>
          <button 
            onClick={() => navigate('/login')} 
            className="signup-button">
            Login
          </button>
      </div>
    </div>
  );
}
