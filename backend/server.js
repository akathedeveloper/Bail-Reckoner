require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { registerUser, loginUser } = require("./authController");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/register", registerUser); 
app.post("/login", loginUser);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
