import React, { useState } from 'react';
import { useAuthStore } from '../components/auth';
import { KeyRound, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/signup.css';

export default function SignupPage() {
  const [isFlipped, setIsFlipped] = useState(false); // Determines which form to show
  const [isJudge, setIsJudge] = useState(false); // For official authority signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useAuthStore();
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass both isOfficial (set by isFlipped) and isJudge from the checkbox
    const result = await signup(email, password, { isOfficial: isFlipped, isJudge });
    if (!result?.error) {
      navigate('/login');
    }
  };  

  return (
    <div className="signup-container">
      <div className="flip-container">
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          {/* Front: Normal User Signup */}
          <div className="flip-card-front">
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
                <button type="submit" disabled={isLoading} className="signup-button" style={{marginTop: "20px"}}>
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
              </form>
              <p style={{textAlign:"center"}}>Already have an account?</p>
              <button onClick={() => navigate('/login')} className="signup-button">
              Log In
              </button>
              <button
                type="button"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  backgroundColor: hover ? "#4f46e5" : "white",
                  border: "2px solid #4f46e5",
                  color: hover ? "white" : "#4f46e5",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "20px",
                  display: "block",      
                  margin: "20px auto",   
                  transition: "all 0.3s ease",
                }}
                onClick={() => setIsFlipped(true)}>
                Official Authority
              </button>
            </div>
          </div>

          {/* Back: Official Authority Signup */}
          <div className="flip-card-back">
            <div className="signup-box">
              <div className="signup-header">
                <h1>Create Official Account</h1>
                <p>Sign up to get started as an official authority</p>
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
                <div className="input-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={isJudge}
                      onChange={(e) => setIsJudge(e.target.checked)}
                    />
                    Judge
                  </label>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={isLoading} className="signup-button">
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
              </form>
              <p style={{textAlign:"center"}}>Already have an account?</p>
              <button onClick={() => navigate('/login')} className="signup-button">
              Log In
              </button>
              <button
                type="button"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  backgroundColor: hover ? "#4f46e5" : "white",
                  border: "2px solid #4f46e5",
                  color: hover ? "white" : "#4f46e5",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "20px",
                  transition: "all 0.3s ease",
                  display: "block",      
                  margin: "20px auto"   
                }}
                onClick={() => setIsFlipped(false)}
              >
                Normal User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
