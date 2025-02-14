import { create } from "zustand";

const API_URL = "http://localhost:5000"; // Backend server

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signup: async (email, password) => {
    try {
      set({ isLoading: true, error: null });

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Signup failed");

      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { error: error.message };
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
  
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Login response data:", data); // <-- Log the data
  
      if (!response.ok) throw new Error(data.error || "Login failed");
  
      localStorage.setItem("token", data.token);
      set({ user: { email, token: data.token }, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { error: error.message };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
