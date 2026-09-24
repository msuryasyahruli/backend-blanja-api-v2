// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const createHttpError = require("http-errors");
const router = require("./src/routes");
const { xss } = require("express-xss-sanitizer");

// Initialize express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

// Root route
app.use(router);

// Handle undefined routes
// app.all("*", (req, res, next) => {
//   next(new createHttpError.NotFound("Route not found"));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const messageError = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message: messageError,
  });
});

// Define port and start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
