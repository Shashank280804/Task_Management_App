// MONGOOSE CONNECTS TO THE DATABASE

// Import the Mongoose module
const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true, // Parse connection string with new URL parser
  useCreateIndex: true // Ensure indexes are created
});
