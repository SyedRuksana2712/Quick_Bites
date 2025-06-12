const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');
const User = require('./models/User'); // Import the User model
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');  // Add jsonwebtoken for token generation

// App config
const app = express();
const port = process.env.PORT || 5000 ;

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

const corsOptions = {
  origin: 'http://localhost:3001', // Frontend URL (adjust this if needed)
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

// MongoDB connection using async/await
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://syedruksana:syedruksana@cluster0.f2ewl.mongodb.net/backend?retryWrites=true&w=majority");
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

// Call the connectDB function to connect to MongoDB
connectDB();

// Define a simple route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Define the signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document using the User model with the hashed password
    const user = new User({
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Send success response after successful registration
    res.status(201).json({ message: "User Registered" });
    console.log("User Registration completed...");
  } catch (err) {
    console.log("Error during user registration:", err);
    res.status(500).json({ message: 'Error creating user, please try again later.' });
  }
});

// Define the login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',  // use an environment variable for the JWT secret key
      { expiresIn: '1h' } // Set token expiration time
    );

    // Send success response with the token
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log("Error during user login:", err);
    res.status(500).json({ message: 'Error logging in, please try again later.' });
  }
});

// Start the server
const server = app.listen(port, (err) => {
  if (err) {
    console.error('Server error:', err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
