import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { KeyRound, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../assets/css/signup.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SignupPage() {
  const [isFlipped, setIsFlipped] = useState(false); // Determines which form to show
  const [isJudge, setIsJudge] = useState(false);     // For official authority signup
  const [email, setEmail] = useState("");
  const [full_name, setFullName] = useState("");     // Full name state
  const [password, setPassword] = useState("");
  const [hover, setHover] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);    // Local error message state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    // Build a role or status based on isFlipped / isJudge if desired
    const role = isJudge ? "judge" : isFlipped ? "legal aid provider" : "under trial prisoner";
    
    try {
      // Insert a new row into the "users" table
      // Make sure the columns match your Supabase DB schema
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email,
            full_name,
            password,
            role,
          },
        ]);

      if (error) {
        console.error("Error inserting user:", error);
        setErrorMsg(error.message);
      } else {
        // On success, navigate to login
        navigate("/login");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMsg("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="flip-container">
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
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
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="text"
                      value={full_name}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Full Name"
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
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="signup-button"
                  style={{ marginTop: "20px" }}
                >
                  {isLoading ? "Signing up..." : "Sign up"}
                </button>
              </form>
              <p style={{ textAlign: "center" }}>Already have an account?</p>
              <button onClick={() => navigate("/login")} className="signup-button">
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
                onClick={() => setIsFlipped(true)}
              >
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
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="text"
                      value={full_name}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Full Name"
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
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                <button type="submit" disabled={isLoading} className="signup-button">
                  {isLoading ? "Signing up..." : "Sign up"}
                </button>
              </form>
              <p style={{ textAlign: "center" }}>Already have an account?</p>
              <button onClick={() => navigate("/login")} className="signup-button">
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
                  margin: "20px auto",
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
