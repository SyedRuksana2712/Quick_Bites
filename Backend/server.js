
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // your User schema

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS config for local + Render frontend
const corsOptions = {
  origin: ['http://localhost:3001', 'https://your-frontend.onrender.com'],
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      
    });
    console.log(' Connected to MongoDB');
  } catch (err) {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  }
}
connectDB();

// Health check route
app.get("/", (req, res) => {
  res.send(" API is working!");
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User Registered" });
    console.log("User Registration completed.");
  } catch (err) {
    console.error(" Error during registration:", err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(" Error during login:", err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});