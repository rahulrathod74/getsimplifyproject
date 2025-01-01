require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const connectDB = require('./config/db');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// CORS Options
const corsOptions = {
  origin: 'https://bulksendemail.netlify.app', // Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow cookies if needed
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
